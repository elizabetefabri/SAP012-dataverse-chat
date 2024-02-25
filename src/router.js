let ROUTES = {};
let rootEl = "";

export const setRoutes = (routes) => {
  ROUTES = routes;
};

export const setRootEl = (el) => {
  rootEl = el;
};

const queryStringToObject = (queryString) => {
  const params = new URLSearchParams(queryString);
  return Object.fromEntries(params.entries());
};

const renderView = (pathName, props = {}) => {
  rootEl.innerHTML = "";

  const viewFunc = ROUTES[pathName];
  const viewEl = viewFunc(props);

  rootEl.appendChild(viewEl);
};

export const navigateTo = (pathname, props = {}) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  renderView(pathname, props);
};

export const onURLChange = () => {
  const { pathname, search } = window.location;
  const props = queryStringToObject(search);
  renderView(pathname, props);
};
