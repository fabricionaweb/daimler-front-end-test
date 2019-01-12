const DEFAULT_STATE = {
  VATRate: 0,
  products: [],
  total: {
    beforeVAT: 0,
    VAT: 0,
    afterVAT: 0,
  },
};

export class shoppingcartModel {
  constructor (initialState = {}) {
    this.state = Object.assign({}, DEFAULT_STATE, initialState);
  }

  get cart () {
    const { VATRate, products } = this.state;

    const reduceProductsPrice = (prev, { price, quantity }) => {
      return prev + price * quantity;
    };

    const beforeVAT = products.reduce(reduceProductsPrice, 0);
    const VAT = (beforeVAT / 100) * VATRate;
    const afterVAT = beforeVAT + VAT;

    const total = {
      beforeVAT,
      VAT,
      afterVAT,
    };

    return Object.assign({}, this.state, { total });
  }

  getProductOnCart (product) {
    return this.state.products.find(({ name }) => name === product.name);
  }

  filterProducts (products) {
    const filterNames = products.map(({ name }) => name);
    return this.state.products.filter(({ name }) => !filterNames.includes(name));
  }

  addProducts (product) {
    product.quantity = product.quantity || 1;

    const alreadyInCart = this.getProductOnCart(product);

    if (alreadyInCart) {
      this.changeProductQuantity(product, alreadyInCart.quantity + product.quantity);
    } else {
      this.state.products = this.state.products.concat(Object.assign({}, product));
    }

    return this.cart;
  }

  changeProductQuantity (product, newQuantity) {
    const productInCart = this.getProductOnCart(product);

    newQuantity = parseInt(newQuantity);
    productInCart.quantity = newQuantity < 1 ? 1 : newQuantity;

    return this.cart;
  }

  removeProducts (products) {
    if (!Array.isArray(products)) {
      products = [products];
    }

    this.state.products = this.filterProducts(products);
    return this.cart;
  }

  destroy () {
    this.state = Object.assign({}, DEFAULT_STATE);
    return this.cart;
  }
}

export default shoppingcartModel;
