let ROUTES = {};
let rootEl = "";

export const setRoutes = (routes) => {
  ROUTES = routes;
};

export const setRootEl = (el) => {
  rootEl = el;
};

const renderView = (pathName, props = {}) => {
  rootEl.innerHTML = "";
  rootEl.appendChild(ROUTES[pathName](props));
};

export const onURLChange = () => {
  const { pathname, queryString } = window.location;
  renderView(pathname, queryString);
};

export const navigateTo = (pathName) => {
  //atualiza o histórico da janela com pushState
  // renderiza a view com o nome do caminho e props
}
