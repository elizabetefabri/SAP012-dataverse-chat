import Home from "./views/Home.js";
import About from "./views/About.js";
import data from "./data/dataset.js";
import { setRootEl, setRoutes, onURLChange } from "./router.js";

import { sortData, filterData } from "./lib/dataFunctions.js";

import { renderFooter } from "./components/RenderFooter.js";
import { renderHeader } from "./components/RenderHeader.js";
import { renderCardUl } from "./components/RenderCard.js";

let processedData = [];
let sortedData = [];

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

  rootElement.appendChild(Home(data));

  const filterSelectElement = rootElement.querySelector("#filters");
  filterSelectElement.addEventListener("change", function () {
    processedData = filterData(
      data,
      filterSelectElement.name,
      filterSelectElement.value
    );
    rootElement.querySelector("#cards").innerHTML = "";

    rootElement
      .querySelector("#cards")
      .appendChild(renderCardUl(processedData));
  });

  const orderSelectElement = rootElement.querySelector("#order");
  orderSelectElement.addEventListener("change", function () {
    if (orderSelectElement.value === "asc") {
      sortedData = sortData(processedData, "idadePersona", "asc");
    } else if (orderSelectElement.value === "desc") {
      sortedData = sortData(processedData, "idadePersona", "desc");
    }

    rootElement.querySelector("#cards").innerHTML = "";
    rootElement.querySelector("#cards").appendChild(renderCardUl(sortedData));
  });

  const btnLimparElements = rootElement.querySelector("#btn-limpar");
  btnLimparElements.addEventListener("click", function () {

    rootElement.querySelector("#cards").innerHTML = "";
    filterSelectElement.value = "Todos";
    orderSelectElement.value = "todos";
    rootElement.querySelector("#cards").appendChild(renderCardUl(data))
  })

});
