import { Header } from "../components/Header/index.js";
import { Footer } from "../components/Footer/index.js";
import { Card } from "../components/Card/index.js";
import { sortData, filterData } from "../lib/dataFunctions.js";
import data from "../data/dataset.js";

const headerContent = {
  img: {
    class: "image__logo",
    src: "./images/logoDesktop.png",
    alt: "Logo DataverseChat",
  },
  description: "",
};

let processedData = [];
let sortedData = [];

export const Home = () => {
  const mainEl = document.createElement("div");

  mainEl.innerHTML = `
  <div class="container__h1">
    <h1 class="h1">Comunidade Criativa</h1>
  </div>
  <main class="main">
    <h2>Clique em um Card e Participe de Conversas sobre Arte, Música, Moda e Mais!</h2>
      <section>
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
      </section>

      <div id="cards"></div>
    </main>
  `;
  const rootElement = document.getElementById("root");
  rootElement.insertAdjacentElement("beforebegin", Header(headerContent));
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

    mainEl.querySelector("#cards").innerHTML = "";
    mainEl.querySelector("#cards").appendChild(Card(sortedData));
  });

  const btnLimparElements = mainEl.querySelector("#btn-limpar");
  btnLimparElements.addEventListener("click", function () {
    mainEl.querySelector("#cards").innerHTML = "";
    filterSelectElement.value = "Todos";
    orderSelectElement.value = "todos";
    mainEl.querySelector("#cards").appendChild(Card(data));
  });

  const footerElement = document.createElement("footer");
  footerElement.appendChild(Footer());
  rootElement.insertAdjacentElement("afterend", footerElement);

  return mainEl;
};
