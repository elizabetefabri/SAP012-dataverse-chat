import data from "../../../data/dataset.js";
import { Header } from "../../../components/Header/index.js";
import { dadosUsuarios } from "../../../components/Usuario/index.js";

// import { communicateWithOpenAI } from "../../../lib/openAIApi.js";
import loadStyle from "../../../styleLoader.js";

const headerData = {
  img: {
    class: "image__usuario",
    src: "",
    alt: "Image users",
  },
  description: {
    title: "Comunidade Criativa",
    subTitle: `24 membros, 24 online`,
  },
};

export const Grupo = () => {
  loadStyle("./views/pages/Grupo/style.css");

  const viewEl = document.createElement("div");
  viewEl.classList.add("background");

  viewEl.innerHTML = `
  <main class="container__main">
    <div class="centralizado">
      <section id="chat">
        <div id="messages">
        </div>
      </section>
      <div id="openai_digitando"></div>
      <section class="container__input relative">
        <div class="container_input__chat">
          <input class="input__chat" id="input__chat" type="text" placeholder="Digite sua pergunta?" />
          <button id="btn_enviar_chat">
            <i class='fas fa-location-arrow fa-lg'></i>
          </button>
        </div>
      </section>
    </div>

  </main>
  <section id="container__dados">
    <div class="desktop-content">
      <div id="usuarios"></div>
    </div>
  </section>

  `;

  document.body.insertAdjacentHTML("beforebegin", `
    <header>
      ${Header(headerData).outerHTML}
    </header>
  `);

  const cardElement = dadosUsuarios(data);
  viewEl.querySelector("#usuarios").appendChild(cardElement);

  return viewEl;
};
