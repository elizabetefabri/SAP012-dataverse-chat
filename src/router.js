let routes = {};
let rootEl = null;
const ERROR_PATH = "/error";

export const setRoutes = (newRoutes) => {
  // Adiciona validação para garantir que newRoutes seja um objeto
  if (typeof newRoutes !== 'object' || newRoutes === null) {
    throw new Error('As rotas devem ser um objeto.');
  }
  routes = newRoutes;
};

export const setRootEl = (element) => {
  // Adiciona validação para garantir que element seja um elemento DOM válido
  if (!(element instanceof Element)) {
    throw new Error('O elemento raiz deve ser um elemento DOM válido.');
  }
  rootEl = element;
};

const queryStringToObject = (queryString) =>
  Object.fromEntries(new URLSearchParams(queryString).entries());

const renderView = (pathName, props = {}) => {
  // Adiciona tratamento para rota não encontrada
  if (!(pathName in routes)) {
    console.error(`Rota não encontrada: ${pathName}`);
    pathName = ERROR_PATH;
  }
  // Usa textContent para evitar injeção de HTML
  rootEl.textContent = "";
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
