let routes = {};
let rootEl = null;
const ERROR_PATH = "/error";

export const setRoutes = (newRoutes) => {
  routes = newRoutes;
};

export const setRootEl = (element) => {
  rootEl = element;
};

const queryStringToObject = (queryString) =>
  Object.fromEntries(new URLSearchParams(queryString).entries());

const renderView = (pathName, props = {}) => {
  if (!(pathName in routes)) {
    pathName = ERROR_PATH;
  }
  rootEl.innerHTML = "";
  const viewEl = routes[pathName](props);
  rootEl.appendChild(viewEl);
};

export const navigateTo = (pathname, props = {}) => {
  const url = window.location.origin + pathname;
  window.history.pushState({}, pathname, url);
  renderView(pathname, props);
};

export const onURLChange = () => {
  const { pathname, search } = window.location;
  const props = queryStringToObject(search);
  renderView(pathname, props);
};
