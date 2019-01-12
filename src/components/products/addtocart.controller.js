import shoppingcartView from '../shoppingcart/shoppingcart.view';

const OPTIONS = {
  dataset: 'shopListing',
};

export class addToCart {
  constructor ($element, sharedModel) {
    this.$element = $element;
    this.model = sharedModel;
    this.view = new shoppingcartView();
  }

  init () {
    this.product = this.getProduct();
    this.$element.addEventListener('click', this.onAddToCartClick.bind(this));
  }

  getProduct () {
    const product = this.$element.dataset[OPTIONS.dataset];
    return JSON.parse(product);
  }

  onAddToCartClick (event) {
    event.preventDefault();

    const cart = this.model.addProducts(this.product);
    this.view.refresh(cart);
  }
}

export default ($element, sharedModel) => {
  const component = new addToCart($element, sharedModel);
  component.init();
};
