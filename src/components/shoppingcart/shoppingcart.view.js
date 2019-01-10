(function (root, MODULE_NAME, NAMESPACE) {
  root[NAMESPACE] = root[NAMESPACE] || {};

  let _$shopForm, _$template;
  const _options = {
    shopForm: {
      selector: '[data-shop-form]',
      tbody: '[data-shop-tbody]',
      template: {
        selector: '[data-shop-item-template]',
        productName: '[data-item-name]',
        productDescription: '[data-item-description]',
        productQuantity: '[data-item-quantity]',
      },
    },
  };

  root[NAMESPACE][MODULE_NAME] = function () {
    const _hideShopForm = () => _$shopForm.setAttribute('hidden', true);
    const _displayShopForm = () => _$shopForm.removeAttribute('hidden');

    const _buildProductsRowDOM = (product) => {
      const { template } = _options.shopForm;
      const { productName, productDescription, productQuantity } = template;

      const $template = document.importNode(_$template.content, true);

      $template.querySelector(productName).innerText = product.name;
      $template.querySelector(productDescription).innerText = product.description;
      $template.querySelector(productQuantity).value = product.quantity;

      return $template;
    };

    const _updateShopFormProductsDOM = (products) => {
      const { tbody } = _options.shopForm;

      const $tbody = document.querySelector(tbody);
      const $fragment = $tbody.cloneNode();

      products.map(_buildProductsRowDOM).map(($tr) => $fragment.appendChild($tr));

      $tbody.replaceWith($fragment);
    };

    return {
      init: function () {
        const { shopForm } = _options;

        _$shopForm = _$shopForm || document.querySelector(shopForm.selector);
        _$template = _$template || document.querySelector(shopForm.template.selector);
      },

      refresh: function (cart) {
        const { products } = cart;

        if (!products.length) {
          return _hideShopForm();
        }

        _updateShopFormProductsDOM(products);
        _displayShopForm();
      },
    };
  };
})(window, 'shoppingcartView', 'nn');
