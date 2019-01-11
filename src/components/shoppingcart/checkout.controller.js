const _options = {
  messageDataset: 'message',
  shopBody: '[data-shop-tbody]',
};

const checkout = function ($element) {
  let _message, _$tbody;

  return {
    init: function () {
      const { messageDataset, shopBody } = _options;

      _$tbody = document.querySelector(shopBody);
      _message = $element.dataset[messageDataset];

      $element.addEventListener('click', this.onCheckoutClick.bind(this));
    },

    onCheckoutClick: function (event) {
      event.preventDefault();

      $element.setAttribute('disabled', 'disabled');
      $element.innerText = _message;

      _$tbody.setAttribute('disabled', 'disabled');
    },
  };
};

export default ($element) => {
  new checkout($element).init();
};
