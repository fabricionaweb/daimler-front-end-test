import shoppingcartView from './shoppingcart.view';

const OPTIONS = {
  closest: {
    selector: '[data-product]',
    dataset: 'product',
  },
  typeDataset: 'quantityType',
};

export class quantity {
  constructor ($element, sharedModel) {
    this.$element = $element;
    this.model = sharedModel;
    this.view = new shoppingcartView();

    this.type = this.$element.dataset[OPTIONS.typeDataset];
  }

  init () {
    this.product = this.getProduct();

    if (this.type === 'input') {
      return this.$element.addEventListener('blur', this.onQuantityBlur.bind(this));
    }

    this.$element.addEventListener('click', this.onQuantityClick.bind(this));
  }

  getProduct () {
    const { closest } = OPTIONS;

    const $product = this.$element.closest(closest.selector);
    const product = $product.dataset[closest.dataset];

    return JSON.parse(product);
  }

  onQuantityClick (event) {
    event.preventDefault();
    let newQuantity;

    if (this.type === 'increase') {
      newQuantity = this.product.quantity + 1;
    } else if (this.type === 'decrease') {
      newQuantity = this.product.quantity - 1;
    }

    this.changeQuantity(newQuantity);
  }

  onQuantityBlur ({ target }) {
    const newQuantity = parseInt(target.value);
    this.changeQuantity(newQuantity);
  }

  changeQuantity (newQuantity) {
    const cart = this.model.changeProductQuantity(this.product, newQuantity);
    this.view.refresh(cart);
  }
}

export default ($element, sharedModel) => {
  const component = new quantity($element, sharedModel);
  component.init();
};
