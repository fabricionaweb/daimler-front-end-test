import shoppingcartModel from '../shoppingcart/shoppingcart.model';

const OPTIONS = {
  query: '[data-component]',
};

const sharedModal = new shoppingcartModel({ VATRate: 20 });

// for webpack to index all of components and create chunks
const loader = require.context('../', true, /^(?!.*\.test).*\.js$/, 'lazy');

export class componentLoader {
  constructor (element) {
    this.elements = element.querySelectorAll(OPTIONS.query);
  }

  init () {
    this.elements.forEach(($element) => {
      const attribute = $element.dataset.component;
      const components = attribute.split(/\s+/);

      components.forEach((module) => {
        this.instance($element, module);
      });
    });
  }

  async instance ($element, module) {
    try {
      const component = await loader(`./${module}.controller.js`);
      component.default($element, sharedModal);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`Component: '${module}' could not loaded\n`, e);
    }
  }
}

export default componentLoader;
