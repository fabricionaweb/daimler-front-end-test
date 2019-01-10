(function (root, MODULE_NAME, NAMESPACE) {
  root[NAMESPACE] = root[NAMESPACE] || {};

  let _$shopForm, _$template, _loader;
  const _options = {
    shopForm: '[data-shop-form]',
    tbody: '[data-shop-tbody]',
    template: {
      selector: '[data-shop-item-template]',
      productName: '[data-item-name]',
      productDescription: '[data-item-description]',
      productQuantity: '[data-item-quantity]',
    },
  };

  root[NAMESPACE][MODULE_NAME] = function () {
    const _hideShopForm = () => _$shopForm.setAttribute('hidden', true);
    const _displayShopForm = () => _$shopForm.removeAttribute('hidden');

    const _buildProductsRowDOM = (product) => {
      const { productName, productDescription, productQuantity } = _options.template;
      const $template = document.importNode(_$template.content, true);

      $template.firstElementChild.setAttribute('data-product', JSON.stringify(product));

      $template.querySelector(productName).innerText = product.name;
      $template.querySelector(productDescription).innerText = product.description;
      $template.querySelector(productQuantity).value = product.quantity;

      return $template;
    };

    const _updateShopFormProductsDOM = (products) => {
      const $tbody = document.querySelector(_options.tbody);
      const $fragment = $tbody.cloneNode();

      products.map(_buildProductsRowDOM).map(($tr) => $fragment.appendChild($tr));

      $tbody.replaceWith($fragment);
    };

    return {
      init: function () {
        const { shopForm, template } = _options;

        _$shopForm = _$shopForm || document.querySelector(shopForm);
        _$template = _$template || document.querySelector(template.selector);

        _loader = _loader || new root[NAMESPACE].componentLoader();
      },

      refresh: function (cart) {
        const { products } = cart;

        if (!products.length) {
          return _hideShopForm();
        }

        _updateShopFormProductsDOM(products);
        _displayShopForm();

        this.componentsLoader();
      },

      componentsLoader: function () {
        const elements = _$shopForm.querySelectorAll('[data-component]');

        _loader.init(elements);
      },
    };
  };
})(window, 'shoppingcartView', 'nn');
