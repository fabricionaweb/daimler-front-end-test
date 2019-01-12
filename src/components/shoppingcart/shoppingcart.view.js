import componentLoader from '../page/componentloader';

const OPTIONS = {
  shopForm: '[data-shop-form]',
  shopBody: '[data-shop-tbody]',
  currency: '€',
  shopItem: {
    selector: '[data-shop-item-template]',
    productDataset: 'data-product',
    productName: '[data-item-name]',
    productDescription: '[data-item-description]',
    productPrice: '[data-item-price]',
    productQuantity: '[data-item-quantity]',
  },
  resume: {
    selector: '[data-shop-resume]',
    beforeVAT: '[data-shop-resume-before-vat]',
    afterVAT: '[data-shop-resume-after-vat]',
    VATRate: '[data-shop-resume-vat-rate]',
    VAT: '[data-shop-resume-vat]',
  },
};

export class shoppingcartView {
  constructor () {
    this.$shopForm = document.querySelector(OPTIONS.shopForm);
    this.$template = document.querySelector(OPTIONS.shopItem.selector);
    this.$resume = document.querySelector(OPTIONS.resume.selector);
  }

  hideShopForm () {
    this.$shopForm.setAttribute('hidden', true);
  }

  displayShopForm () {
    this.$shopForm.removeAttribute('hidden');
  }

  buildProductsRowDOM (product) {
    const {
      productDataset,
      productName,
      productDescription,
      productPrice,
      productQuantity,
    } = OPTIONS.shopItem;

    const $row = document.importNode(this.$template.content, true);

    $row.firstElementChild.setAttribute(productDataset, JSON.stringify(product));

    $row.querySelector(productName).innerText = product.name;
    $row.querySelector(productDescription).innerText = product.description;
    $row.querySelector(productPrice).innerText = `${OPTIONS.currency}${product.price}`;
    $row.querySelector(productQuantity).value = product.quantity;

    return $row;
  }

  updateCartBodyDOM ({ products }) {
    const $shopBody = document.querySelector(OPTIONS.shopBody);
    const $fragment = $shopBody.cloneNode();

    if ($shopBody.getAttribute('disabled')) {
      return false;
    }

    const $children = products.map(this.buildProductsRowDOM.bind(this));
    $children.forEach(($row) => $fragment.appendChild($row));

    $shopBody.replaceWith($fragment);
  }

  updateResumeDOM ({ total, VATRate }) {
    const { beforeVAT, VAT, afterVAT } = total;
    const { resume, currency } = OPTIONS;
    const $resume = this.$resume;

    $resume.querySelector(resume.VATRate).innerText = `${VATRate}%`;
    $resume.querySelector(resume.beforeVAT).innerText = `${currency}${beforeVAT.toFixed(2)}`;
    $resume.querySelector(resume.VAT).innerText = `${currency}${VAT.toFixed(2)}`;
    $resume.querySelector(resume.afterVAT).innerText = `${currency}${afterVAT.toFixed(2)}`;
  }

  refresh (cart) {
    if (!cart.products.length) {
      return this.hideShopForm();
    }

    this.updateCartBodyDOM(cart);
    this.updateResumeDOM(cart);
    this.displayShopForm();
    this.componentsLoader();
  }

  componentsLoader () {
    const loader = new componentLoader(this.$shopForm);
    loader.init();
  }
}

export default shoppingcartView;
