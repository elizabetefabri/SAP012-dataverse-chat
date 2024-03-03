import data from "../../data/dataset.js";
import { filterData, sortData } from "../../lib/dataFunctions.js";
import loadStyle from "../../styleLoader.js";
import { Card } from "../Card/index.js";

let processedData = [];
let sortedData = [];

export const Filtros = () => {
  loadStyle("./components/Filtros/style.css");
  const mainEl = document.createElement("div");

  mainEl.innerHTML = `

    <div class="section-filters">
    <label for="filters" id="search-filters" class="filters">Filtrar por:</label>
    <select id="filters" name="pais-nascimento-persona" data-testid="select-filter">
      <option value="Todos" hidden disabled></option>
      <option value="brasileiro">Brasileiro</option>
      <option value="italiano">Italiano</option>
      <option value="argentino">Argentino</option>
      <option value="americano">Americano</option>
      </select>
      <label for="order">Ordenar por:</label>
        <select id="order" name="name" data-testid="select-sort">
          <option value="todos" hidden disabled></option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
      </select>

      <button id="btn-limpar" data-testid="button-clear">
        Limpar Filtros
      </button>
    </div>
    <div id="cards"></div>
  `;
  const cardElement = Card(data);
  mainEl.querySelector("#cards").appendChild(cardElement);

  const filterSelectElement = mainEl.querySelector("#filters");
  filterSelectElement.addEventListener("change", function () {
    processedData = filterData(
      data,
      filterSelectElement.name,
      filterSelectElement.value
    );
    mainEl.querySelector("#cards").innerHTML = "";
    mainEl.querySelector("#cards").appendChild(Card(processedData));
  });

  const orderSelectElement = mainEl.querySelector("#order");
  orderSelectElement.addEventListener("change", function () {
    sortedData = sortData(
      processedData,
      orderSelectElement.name,
      orderSelectElement.value
    );

    const btnLimparElements = mainEl.querySelector("#btn-limpar");
    btnLimparElements.addEventListener("click", function () {
      mainEl.querySelector("#cards").innerHTML = "";
      filterSelectElement.value = "Todos";
      orderSelectElement.value = "todos";
      mainEl.querySelector("#cards").appendChild(Card(data));
    });

    mainEl.querySelector("#cards").innerHTML = "";
    mainEl.querySelector("#cards").appendChild(Card(sortedData));
  });

  return mainEl;
}
