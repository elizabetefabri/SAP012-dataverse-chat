import { Home } from "./views/Home.js";
import { Chat } from "./views/Chat.js";

import { setRootEl, setRoutes, onURLChange } from "./router.js";

const routes = {
  "/": Home,
  "/chat": Chat,
};

setRoutes(routes);

window.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root");

  setRootEl(rootElement);
  onURLChange();
});
