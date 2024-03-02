import { Home } from "./views/Home.js";
import { Chat } from "./views/pages/Chat/index.js";
import { Error } from "./views/pages/Error/index.js";
import { Grupo } from "./views/pages/Grupo/index.js";

import { setRootEl, setRoutes, onURLChange } from "./router.js";

const routes = {
  "/": Home,
  "/chat": Chat,
  "/error": Error,
  "/grupo": Grupo
};

setRoutes(routes);

window.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root");

  setRootEl(rootElement);
  onURLChange();
});
