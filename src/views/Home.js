import { Header } from "../components/Header/index.js";
import { Footer } from "../components/Footer/index.js";
import { Filtros } from "../components/Filtros/index.js";

const headerContent = {
  img: {
    class: "image__logo",
    src: "./images/logoDesktop.png",
    alt: "Logo DataverseChat",
  },
  description: "",
};

export const Home = () => {
  const mainEl = document.createElement("div");

  mainEl.innerHTML = `
  <div class="container__h1">
    <h1 class="h1">Comunidade Criativa</h1>
  </div>
  <main class="main">
    <h2>Clique em um Card e Participe de Conversas sobre Arte, Música, Moda e Mais!</h2>
    <section id="renderFiltros">
    </section>

    <div id="cards"></div>
    </main>
  `;
  const rootElement = document.getElementById("root");
  rootElement.insertAdjacentElement("beforebegin", Header(headerContent));

  const filterSelectElement = mainEl.querySelector("#renderFiltros");
  filterSelectElement.appendChild(Filtros());

  const footerElement = document.createElement("footer");
  footerElement.appendChild(Footer());
  rootElement.insertAdjacentElement("afterend", footerElement);

  return mainEl;
};
