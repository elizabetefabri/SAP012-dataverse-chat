import { renderCardUl } from "../components/RenderCard.js";
import { sortData, filterData } from "../lib/dataFunctions.js";
import data from "../data/dataset.js";
let processedData = [];
let sortedData = [];

const Home = () => {
  const viewEl = document.createElement("div");

  viewEl.innerHTML = `
  <div class="container__h1">
    <h1>Comunidade Criativa Multifacetada</h1>
  </div>
  <main>
    <h2>Uma plataforma que reúne o Artista Expressivo, o Músico Melódico, o Observador de Aves, o Fashionista Elegante e outros. Os usuários podem compartilhar suas criações artísticas, músicas, fotos de aves, dicas de moda, receitas inspiradas na natureza e participar de desafios criativos. Um espaço onde diferentes formas de expressão se encontram.</h2>
      <section>
        <div class="section-filters">
        <label for="filters" id="search-filters" class="filters">Filtrar por:</label>
        <select id="filters" name="pais-nascimento-persona" data-testid="select-filter">
          <option value="Todos" hidden disabled></option>
          <option value="brasil">Brasil</option>
          <option value="italia">Itália</option>
          <option value="argentina">Argentina</option>
          <option value="eua">EUA</option>
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

  const cardElement = renderCardUl(data);
  viewEl.querySelector("#cards").appendChild(cardElement);

  const filterSelectElement = viewEl.querySelector("#filters");
  filterSelectElement.addEventListener("change", function () {
    processedData = filterData(
      data,
      filterSelectElement.name,
      filterSelectElement.value
    );
    viewEl.querySelector("#cards").innerHTML = "";
    viewEl.querySelector("#cards").appendChild(renderCardUl(processedData));
  });

  const orderSelectElement = viewEl.querySelector("#order");
  orderSelectElement.addEventListener("change", function () {
    sortedData = sortData(
      processedData,
      orderSelectElement.name,
      orderSelectElement.value
    );

    viewEl.querySelector("#cards").innerHTML = "";
    viewEl.querySelector("#cards").appendChild(renderCardUl(sortedData));
  });

  const btnLimparElements = viewEl.querySelector("#btn-limpar");
  btnLimparElements.addEventListener("click", function () {
    viewEl.querySelector("#cards").innerHTML = "";
    filterSelectElement.value = "Todos";
    orderSelectElement.value = "todos";
    viewEl.querySelector("#cards").appendChild(renderCardUl(data));
  });

  return viewEl;
};

export default Home;
