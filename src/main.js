document.addEventListener('DOMContentLoaded', function () {
  const NAMESPACE = 'nn';

  const loader = new window[NAMESPACE].componentLoader();
  const elements = document.querySelectorAll('[data-component]');

  loader.init(elements);
});
