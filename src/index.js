import Home from "./views/Home.js";
import About from "./views/About.js";

import { setRootEl, setRoutes, onURLChange } from "./router.js";

import { renderFooter } from "./components/RenderFooter.js";
import { renderHeader } from "./components/RenderHeader.js";

const routes = {
  "/": Home,
  "/about": About,
};

setRoutes(routes);

window.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root");
  const headerElement = document.getElementById("header");
  const footerElement = document.getElementById("footer");

  headerElement.appendChild(renderHeader());
  footerElement.appendChild(renderFooter());

  setRootEl(rootElement);
  onURLChange();
});
