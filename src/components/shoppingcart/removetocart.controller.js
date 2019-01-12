import shoppingcartView from './shoppingcart.view';

const OPTIONS = {
  closest: {
    selector: '[data-product]',
    dataset: 'product',
  },
};

export class removeToCart {
  constructor ($element, sharedModel) {
    this.$element = $element;
    this.model = sharedModel;
    this.view = new shoppingcartView();
  }

  init () {
    this.product = this.getProduct();
    this.$element.addEventListener('click', this.onRemoveToCartClick.bind(this));
  }

  getProduct () {
    const { selector, dataset } = OPTIONS.closest;

    const $closest = this.$element.closest(selector);
    const product = $closest.dataset[dataset];

    return JSON.parse(product);
  }

  onRemoveToCartClick (event) {
    event.preventDefault();

    const cart = this.model.removeProducts(this.product);
    this.view.refresh(cart);
  }
}

export default ($element, sharedModel) => {
  const component = new removeToCart($element, sharedModel);
  component.init();
};
