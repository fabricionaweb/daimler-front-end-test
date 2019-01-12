const OPTIONS = {
  shopBody: '[data-shop-tbody]',
  messageDataset: 'message',
};

export class checkout {
  constructor ($element) {
    this.$element = $element;
    this.$shopBody = document.querySelector(OPTIONS.shopBody);
    this.message = $element.dataset[OPTIONS.messageDataset];
  }

  init () {
    this.$element.addEventListener('click', this.onCheckoutClick.bind(this));
  }

  onCheckoutClick (event) {
    event.preventDefault();

    this.$element.setAttribute('disabled', 'disabled');
    this.$element.innerText = this.message;

    this.$shopBody.setAttribute('disabled', 'disabled');
  }
}

export default ($element) => {
  const component = new checkout($element);
  component.init();
};
