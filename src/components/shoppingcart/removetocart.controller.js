(function (root, MODULE_NAME, NAMESPACE) {
  root[NAMESPACE] = root[NAMESPACE] || {};

  const _view = root[NAMESPACE].shoppingcartView();
  const _options = {
    closest: '[data-product]',
    dataset: 'product',
  };

  root[NAMESPACE][MODULE_NAME] = function ($element) {
    let _model, _product;

    return {
      init: function (sharedModel) {
        _model = sharedModel;
        _product = this.getProduct();

        _view.init();

        $element.addEventListener('click', this.onRemoveToCartClick.bind(this));
      },

      getProduct: function () {
        const { closest, dataset } = _options;

        const $closest = $element.closest(closest);
        const product = $closest.dataset[dataset];

        return JSON.parse(product);
      },

      onRemoveToCartClick: function (event) {
        event.preventDefault();

        const cart = _model.removeProducts(_product);

        _view.refresh(cart);
      },
    };
  };
})(window, 'removetocartController', 'nn');
