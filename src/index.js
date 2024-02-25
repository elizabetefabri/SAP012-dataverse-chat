import Home from "./views/Home.js";

import { setRootEl, setRoutes, onURLChange } from "./router.js";

import { Footer } from "./components/Footer/index.js";
import { Header } from "./components/Header/index.js";

const routes = {
  "/": Home,

};

setRoutes(routes);

window.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root");
  const headerElement = document.getElementById("header");
  const footerElement = document.getElementById("footer");

  headerElement.appendChild(Header());
  footerElement.appendChild(Footer());

  setRootEl(rootElement);
  onURLChange();
});
