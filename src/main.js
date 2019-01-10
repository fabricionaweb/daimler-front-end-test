document.addEventListener('DOMContentLoaded', function () {
  const NAMESPACE = 'nn';

  const sharedModel = new window[NAMESPACE].shoppingcartModel();
  sharedModel.init();

  const instance = (element) => (module) => {
    try {
      const component = new window[NAMESPACE][module](element);
      component.init(sharedModel);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`Component: '${module}' could not loaded\n`, e);
    }
  };

  const elements = document.querySelectorAll('[data-component]');

  elements.forEach((element) => {
    const attribute = element.dataset.component;
    const components = attribute.split(/\s+/);

    components.forEach(instance(element));
  });
});
