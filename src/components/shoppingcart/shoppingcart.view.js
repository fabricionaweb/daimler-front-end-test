(function (root, MODULE_NAME, NAMESPACE) {
  root[NAMESPACE] = root[NAMESPACE] || {};

  let _$shopForm, _$template, _$resume, _loader;
  const _options = {
    shopForm: '[data-shop-form]',
    shopBody: '[data-shop-tbody]',
    shopItem: {
      selector: '[data-shop-item-template]',
      productName: '[data-item-name]',
      productDescription: '[data-item-description]',
      productQuantity: '[data-item-quantity]',
    },
    resume: {
      selector: '[data-shop-resume]',
      currencyDataset: 'currency',
      beforeVAT: '[data-shop-resume-before-vat]',
      afterVAT: '[data-shop-resume-after-vat]',
      VATRate: '[data-shop-resume-vat-rate]',
      VAT: '[data-shop-resume-vat]',
    },
  };

  root[NAMESPACE][MODULE_NAME] = function () {
    const _getShopFormElement = () => {
      return _$shopForm || document.querySelector(_options.shopForm);
    };

    const _getTemplateElement = () => {
      return _$template || document.querySelector(_options.shopItem.selector);
    };

    const _getResumeElement = () => {
      return _$resume || document.querySelector(_options.resume.selector);
    };

    const _getComponentLoader = () => {
      return _loader || new root[NAMESPACE].componentLoader();
    };

    const _hideShopForm = () => _$shopForm.setAttribute('hidden', true);
    const _displayShopForm = () => _$shopForm.removeAttribute('hidden');

    const _buildProductsRowDOM = (product) => {
      const { productName, productDescription, productQuantity } = _options.shopItem;
      const $template = document.importNode(_$template.content, true);

      $template.firstElementChild.setAttribute('data-product', JSON.stringify(product));

      $template.querySelector(productName).innerText = product.name;
      $template.querySelector(productDescription).innerText = product.description;
      $template.querySelector(productQuantity).value = product.quantity;

      return $template;
    };

    const _updateCartBodyDOM = ({ products }) => {
      const $tbody = document.querySelector(_options.shopBody);
      const $fragment = $tbody.cloneNode();

      products.map(_buildProductsRowDOM).map(($tr) => $fragment.appendChild($tr));

      $tbody.replaceWith($fragment);
    };

    const _updateResumeDOM = ({ total, VATRate }) => {
      const { beforeVAT, VAT, afterVAT } = total;
      const { resume } = _options;
      const currency = _$resume.dataset[resume.currencyDataset];

      _$resume.querySelector(resume.VATRate).innerText = `${VATRate}%`;
      _$resume.querySelector(resume.beforeVAT).innerText = `${currency}${beforeVAT.toFixed(2)}`;
      _$resume.querySelector(resume.VAT).innerText = `${currency}${VAT.toFixed(2)}`;
      _$resume.querySelector(resume.afterVAT).innerText = `${currency}${afterVAT.toFixed(2)}`;
    };

    return {
      init: function () {
        _$shopForm = _getShopFormElement();
        _$template = _getTemplateElement();
        _$resume = _getResumeElement();
        _loader = _getComponentLoader();
      },

      refresh: function (cart) {
        if (!cart.products.length) {
          return _hideShopForm();
        }

        _updateCartBodyDOM(cart);
        _updateResumeDOM(cart);
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
