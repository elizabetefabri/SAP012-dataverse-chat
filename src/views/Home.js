import { renderCardUl } from "../components/RenderCard.js";

const Home = (data) => {
  const viewEl = document.createElement("div");

  viewEl.innerHTML = `
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
            <select id="order" name="sort-order" data-testid="select-sort">
              <option value="todos" hidden disabled></option>
              <option value="desc">Maior idade Persona</option>
              <option value="asc">Menor idade Persona</option>
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

  return viewEl;
};

export default Home;
