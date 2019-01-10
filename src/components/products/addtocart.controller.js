(function (root, MODULE_NAME, NAMESPACE) {
  root[NAMESPACE] = root[NAMESPACE] || {};

  const _view = root[NAMESPACE].shoppingcartView();
  const _options = {
    dataset: 'shopListing',
  };

  root[NAMESPACE][MODULE_NAME] = function ($element) {
    let _model;

    return {
      init: function (sharedModel) {
        _model = sharedModel;

        _view.init();

        $element.addEventListener('click', this.onAddToCartClick.bind(this));
      },

      onAddToCartClick: function ({ target }) {
        const { dataset } = _options;

        const product = JSON.parse(target.dataset[dataset]);
        const cart = _model.addProducts(product);

        _view.refresh(cart);
      },
    };
  };
})(window, 'addtocartController', 'nn');
