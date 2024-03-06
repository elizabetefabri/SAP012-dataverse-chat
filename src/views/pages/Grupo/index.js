import data from "../../../data/dataset.js";
import { Header } from "../../../components/Header/index.js";
import { dadosUsuarios } from "../../../components/Usuario/index.js";
import loadStyle from "../../../styleLoader.js";
import { communicateWithOpenAI } from "../../../lib/openAIApi.js";

const headerData = {
  img: {
    class: "image__grupo",
    alt: "Image users",
  },
  description: {
    title: "Bate papo em Grupo",
    subTitle: `${data.length} membros, e tem ${data.length} digitando...`,
  },
};

export const Grupo = () => {
  loadStyle("./views/pages/Grupo/style.css");

  const viewEl = document.createElement("div");
  viewEl.classList.add("background");

  viewEl.innerHTML = `
    <main class="container__main">
      <div class="centralizado">
        <section class="chat-content individual">
          <div class="container__header">
            <img src="../../../images/chat/icon-chat.png" alt="image" style="width: 80px; height: 80px;">
            <div class="container__name">
              <h3>${headerData.description.title}</h3>
              <p>${headerData.description.subTitle}</p>
            </div>
          </div>
        </section>
        <section id="chat">
          <div id="messages"></div>
        </section>
        <div id="openai_digitando"></div>
        <section class="container__input relative">
          <div class="container_input__chat">
            <input class="input__chat" id="input__chat" type="text" placeholder="Digite sua pergunta?" />
            <button id="btn_enviar_chat">Enviar <i class='fas fa-location-arrow fa-lg'></i></button>
          </div>
        </section>
      </div>
    </main>
    <section id="container__dados">
      <div class="desktop-content">
        <div id="user-cards"></div>
      </div>
    </section>
  `;

  const conversationHistory = [];

  const updateChat = (message) => {
    const messages = document.querySelector("#messages");
    messages.insertAdjacentHTML('beforeend', `<div class="${message.role}-message">${message.content}</div>`);
  };

  const sendMessageToUser = async (user, mensagemEnviada) => {
    try {
      conversationHistory.push({ role: "user", content: `Se comporte como assistente ${user.name} e responda a seguinte pergunta: ${mensagemEnviada}` });
      const resposta = await communicateWithOpenAI(conversationHistory);
      updateChat({ role: "openai", content: ` ${resposta.content}` });
    } catch (error) {
      console.error(`Erro ao enviar mensagem para ${user.name}:`, error);
    }
  };

  const sendMessagesToAllUsers = async (mensagemEnviada) => {
    const openai_digitando = document.querySelector("#openai_digitando");
    openai_digitando.textContent = "Enviando mensagens para todos os usuários...";
    const users = data.slice(0, 24); // Pegando do elemento 0 ao 24 correto
    const userPromises = users.map((user) => sendMessageToUser(user, mensagemEnviada));
    try {
      await Promise.all(userPromises);
    } catch (error) {
      console.error("Erro ao enviar mensagens para todos os usuários:", error);
    } finally {
      openai_digitando.textContent = "";
    }
  };

  const rootElement = document.getElementById("root");
  rootElement.insertAdjacentElement("beforebegin", Header(headerData));

  const cardElement = dadosUsuarios(data);
  viewEl.querySelector("#user-cards").appendChild(cardElement);

  const input__chat = viewEl.querySelector("#input__chat");
  const btn__enviar_chat = viewEl.querySelector("#btn_enviar_chat");

  const sendMessage = async () => {
    const mensagemEnviada = input__chat.value.trim();
    if (!mensagemEnviada) return;

    updateChat({ role: "user", content: `${mensagemEnviada}` });
    input__chat.value = "";
    sendMessagesToAllUsers(mensagemEnviada);
  };

  input__chat.addEventListener("keypress", (event) => {
    if (event.key === "Enter") sendMessage();
  });

  btn__enviar_chat.addEventListener("click", sendMessage);

  return viewEl;
};
