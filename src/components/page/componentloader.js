(function (root, MODULE_NAME, NAMESPACE) {
  root[NAMESPACE] = root[NAMESPACE] || {};

  const _sharedModel = new root[NAMESPACE].shoppingcartModel();
  _sharedModel.init({ VATRate: 20 });

  root[NAMESPACE][MODULE_NAME] = function () {
    return {
      init: function ($elements) {
        $elements.forEach(($element) => {
          const attribute = $element.dataset.component;
          const components = attribute.split(/\s+/);

          components.forEach((module) => {
            this.instance($element, module);
          });
        });
      },

      instance: function ($element, module) {
        try {
          const component = new root[NAMESPACE][module]($element);
          component.init(_sharedModel);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(`Component: '${module}' could not loaded\n`, e);
        }
      },
    };
  };
})(window, 'componentLoader', 'nn');
