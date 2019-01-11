import componentLoader from './components/page/componentloader';

document.addEventListener('DOMContentLoaded', function () {
  const loader = new componentLoader();
  const elements = document.querySelectorAll('[data-component]');

  loader.init(elements);
});
