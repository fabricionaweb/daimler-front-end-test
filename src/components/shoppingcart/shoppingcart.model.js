(function (root, MODULE_NAME, NAMESPACE) {
  root[NAMESPACE] = root[NAMESPACE] || {};

  root[NAMESPACE][MODULE_NAME] = function () {
    let _state;

    const _defaultState = {
      VATRate: 0,
      products: [],
    };

    const _getProductOnCart = (product) => {
      return _state.products.find(({ name }) => name === product.name);
    };

    const _filterProducts = (products) => {
      if (!Array.isArray(products)) {
        products = [products];
      }

      const filterNames = products.map(({ name }) => name);
      return _state.products.filter(({ name }) => !filterNames.includes(name));
    };

    const _reduceProductsPrice = (prev, { price, quantity }) => {
      return prev + price * quantity;
    };

    return {
      init: function (initialState = {}) {
        _state = Object.assign({}, _defaultState, initialState);
      },

      getCart: function () {
        const { VATRate, products } = _state;

        const beforeVAT = products.reduce(_reduceProductsPrice, 0);
        const VAT = (beforeVAT / 100) * VATRate;
        const afterVAT = beforeVAT + VAT;

        const total = {
          beforeVAT,
          VAT,
          afterVAT,
        };

        return Object.assign({}, _state, { total });
      },

      addProducts: function (product) {
        product.quantity = product.quantity || 1;

        const alreadyInCart = _getProductOnCart(product);

        if (alreadyInCart) {
          this.changeProductQuantity(product, alreadyInCart.quantity + product.quantity);
        } else {
          _state.products.push(Object.assign({}, product));
        }

        return this.getCart();
      },

      changeProductQuantity: function (product, newQuantity) {
        const productInCart = _getProductOnCart(product);

        newQuantity = parseInt(newQuantity);
        productInCart.quantity = newQuantity < 1 ? 1 : newQuantity;

        return this.getCart();
      },

      removeProducts: function (products) {
        _state.products = _filterProducts(products);

        return this.getCart();
      },

      destroy: function () {
        _state = _defaultState;

        return this.getCart();
      },
    };
  };
})(window, 'shoppingcartModel', 'nn');
