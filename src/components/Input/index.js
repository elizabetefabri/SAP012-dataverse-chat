import data from "../../data/dataset.js";
import { Header } from '../../components/Header/index.js';
import loadStyle from "../../components/styleLoader.js";

export const Chat = ({ id }) => {
  loadStyle("../../styles/chat.css");
  const users = data.find((users) => users.id === parseInt(id));

  const viewEl = document.createElement("div");
  viewEl.classList.add("background");

  const headerData = {
    img: {
      class: "image__users",
      src: `${users.imageUrlChat}`,
      alt: "Image users",
    },
    description: {
      title: `${users.name}`,
      subTitle: `${users.quote}`,
    },
  };
  viewEl.innerHTML = `
  <section class="chat-content individual">
    <section id="chat">
      <div id="mensagens"></div>
    </section>
  <section class="input-content">
    <div class="input__chat">

      <input type="text" placeholder="Digite sua pergunta?" id="inputChat" />
      <button id="btnEnviarChat">ENVIAR
        <i class='fas fa-location-arrow fa-lg'></i>
      </button>
    </div>
  </section>
</section>
  `;

  const parentElement = document.getElementById("root");

  const headerElement = document.createElement("header");
  headerElement.appendChild(Header(headerData));
  parentElement.insertAdjacentElement("beforebegin", headerElement);

  return viewEl;
}
