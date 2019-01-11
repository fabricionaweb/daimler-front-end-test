import shoppingcartView from './shoppingcart.view';

const _view = new shoppingcartView();
const _options = {
  closest: {
    selector: '[data-product]',
    dataset: 'product',
  },
  typeDataset: 'quantityType',
};

const quantity = function ($element) {
  let _model, _product, _type;

  return {
    init: function (sharedModel) {
      _model = sharedModel;
      _product = this.getProduct();
      _type = $element.dataset[_options.typeDataset];

      _view.init();

      if (_type === 'input') {
        $element.addEventListener('blur', this.onQuantityBlur.bind(this));
      } else {
        $element.addEventListener('click', this.onQuantityClick.bind(this));
      }
    },

    getProduct: function () {
      const { closest } = _options;

      const $product = $element.closest(closest.selector);
      const product = $product.dataset[closest.dataset];

      return JSON.parse(product);
    },

    onQuantityClick: function (event) {
      event.preventDefault();
      let newQuantity;

      if (_type === 'increase') {
        newQuantity = _product.quantity + 1;
      }

      if (_type === 'decrease') {
        newQuantity = _product.quantity - 1;
      }

      const cart = _model.changeProductQuantity(_product, newQuantity);

      _view.refresh(cart);
    },

    onQuantityBlur: function ({ target }) {
      const newQuantity = parseInt(target.value);
      const cart = _model.changeProductQuantity(_product, newQuantity);

      _view.refresh(cart);
    },
  };
};

export default ($element, sharedModel) => {
  new quantity($element).init(sharedModel);
};
