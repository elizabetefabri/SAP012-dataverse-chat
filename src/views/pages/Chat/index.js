import data from "../../../data/dataset.js";
import { Header } from '../../../components/Header/index.js';
import loadStyle from "../../../components/styleLoader.js";

export const Chat = ({ id }) => {
  loadStyle("./views/pages/Chat/style.css");
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
    <main class="container__main">
      <div class="content-main">
        <section class="chat-content individual">
          <div class="container__header">
            <img src="${users.imageUrlChat}" alt="image" style="width: 50px; height: 50px;">
            <div class="container__name">
            <h3>${users.name}</h3>
            <p>${users.quote}</p>
            </div>

          </div>
        </section>

        <section class="container__input">
          <div class="container_input__chat">

            <input class="input__chat" id="input__chat type="text" placeholder="Digite sua pergunta?" />
            <button id="btn_enviar_chat">
              ENVIAR
              <i class='fas fa-location-arrow fa-lg'></i>
            </button>

            <button id="btn_mobile-enviar_chat">
              <i class='fas fa-location-arrow fa-lg'></i>
            </button>
          </div>
        </section>
      </div>
    </main>
  `;

  const parentElement = document.getElementById("root");

  const headerElement = document.createElement("header");
  headerElement.appendChild(Header(headerData));
  parentElement.insertAdjacentElement("beforebegin", headerElement);



  return viewEl;
}
