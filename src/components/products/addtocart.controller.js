import shoppingcartView from '../shoppingcart/shoppingcart.view';

const _view = new shoppingcartView();
const _options = {
  dataset: 'shopListing',
};

const addToCart = function ($element) {
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

export default ($element, sharedModel) => {
  new addToCart($element).init(sharedModel);
};
