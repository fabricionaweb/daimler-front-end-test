import componentLoader from './components/page/componentloader';

document.addEventListener('DOMContentLoaded', () => {
  const loader = new componentLoader(document);
  loader.init();
});
