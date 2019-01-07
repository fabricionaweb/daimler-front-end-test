/* eslint-disable */
(function (root, MODULE_NAME, NAMESPACE) {
  root[NAMESPACE] = root[NAMESPACE] || {};

  root[NAMESPACE][MODULE_NAME] = function () {
    _getCart = function () {
      return {
        total: 0,
        products: []
      }
    };

    return {
      init: (initialState) => { },

      getCart: _getCart,

      addProducts: (newOrExistingProducts) => {
        return _getCart();
      },

      changeProductQuantity: (product, newQuantity) => {
        return _getCart();
      },

      removeProducts: (productsToDelete) => {
        return _getCart();
      },

      destroy: () => { },
    };
  };
})(window, 'shoppingcartModel', 'nn');
