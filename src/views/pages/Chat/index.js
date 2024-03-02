import data from "../../../data/dataset.js";
import { Header } from '../../../components/Header/index.js';
import loadStyle from "../../../styleLoader.js";
import { communicateWithOpenAI } from "../../../lib/openAIApi.js";

export const Chat = ({ id }) => {
  loadStyle("./views/pages/Chat/style.css");

  const users = data.find((user) => user.id === parseInt(id));
  const viewEl = document.createElement("div");
  viewEl.classList.add("background");

  const personaDescriptionToChat = `Você é um: ${users.name}.${users.shortDescription}`;

  const headerData = {
    img: {
      src: `${users.imageUrlChat}`,
      alt: "Image users",
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
            <div id="messageError" class="error-message hide"></div>
          </div>
        </section>

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
  `;
  document.body.insertAdjacentHTML("beforebegin", `
  <header>
    ${Header(headerData).outerHTML}
  </header>
`);

  const input__chat = viewEl.querySelector("#input__chat");
  const btn__enviar_chat = viewEl.querySelector("#btn_enviar_chat");
  const openai_digitando = viewEl.querySelector("#openai_digitando");
  const messages = viewEl.querySelector("#messages");
  const messageError = viewEl.querySelector("#messageError");

  const conversationHistory = [
    { role: "system", content: `Você é um ${personaDescriptionToChat}` },
  ];

  const updateChat = (message) => {
    messages.innerHTML += `<div class="${message.role}-message">${message.content}</div>`;
  };

  input__chat.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

  btn__enviar_chat.addEventListener("click", sendMessage);

  async function sendMessage() {
    const mensagemEnviada = input__chat.value;
    if (!mensagemEnviada.trim()) {
      return;
    }

    // updateChat({ role: "user", content: mensagemEnviada });
    updateChat({ role: "user", content: `<i class='fas fa-user-secret fa-lg'></i> ${mensagemEnviada}` });
    input__chat.value = "";

    openai_digitando.innerHTML = `${users.name} está digitando...`;

    try {
      // Adicionando a última mensagem do usuário à conversa antes de enviar para a API do OpenAI
      conversationHistory.push({ role: "user", content: mensagemEnviada });
      const resposta = await communicateWithOpenAI(conversationHistory);
      // updateChat({ role: "openai", content: resposta.content });
      updateChat({ role: "openai", content: `<i class='fas fa-robot fa-lg'></i> ${resposta.content}` });

      openai_digitando.innerHTML = "";
    } catch (error) {
      openai_digitando.innerHTML = "";
      messageError.classList.add("pop-up");
      messageError.innerHTML = error.message;
      console.error("Erro ao se comunicar com a OpenAI", error);
    }
  }

  return viewEl;
};

