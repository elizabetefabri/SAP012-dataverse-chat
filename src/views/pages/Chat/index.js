import data from "../../../data/dataset.js";
import { Header } from '../../../components/Header/index.js';
import loadStyle from "../../../styleLoader.js";
import { communicateWithOpenAI } from "../../../lib/openAIApi.js";

export const Chat = ({ id }) => {
  // Carregar estilo CSS
  loadStyle("./views/pages/Chat/style.css");

  // Encontrar informações do usuário
  const user = data.find((user) => user.id === parseInt(id));

  // Criar elemento de visualização
  const viewEl = createViewElement(user);

  // Inserir cabeçalho antes do elemento de visualização
  insertHeaderBefore(viewEl);

  // Elementos DOM
  const inputChat = viewEl.querySelector("#input__chat");
  const btnEnviarChat = viewEl.querySelector("#btn_enviar_chat");
  const messagesContainer = viewEl.querySelector("#messages");
  const openaiDigitando = viewEl.querySelector("#openai_digitando");

  // Histórico de conversas
  const conversationHistory = [
    { role: "system", content: `Você é um assistente prestativo com o ${user.name}: ${user.shortDescription}` },
  ];

  // Atualizar chat com nova mensagem
  const updateChat = (message) => {
    messagesContainer.insertAdjacentHTML('beforeend', `<div class="${message.role}-message">${message.content}</div>`);
  };

  // Adicionar mensagem ao histórico de conversas
  const addMessageToHistory = (role, content) => {
    conversationHistory.push({role, content  });
  };

  // Enviar mensagem do usuário para a OpenAI e atualizar o chat
  const sendUserMessageToOpenAI = async (message) => {
    addMessageToHistory("user", message);
    updateChat({ role: "user", content: message });
    openaiDigitando.textContent = `${user.name} está digitando...`;
    await sendOpenAIMessage();
    openaiDigitando.textContent = "";
    inputChat.value = "";
  };

  // Enviar mensagem para a OpenAI e atualizar o chat
  const sendOpenAIMessage = async () => {
    const response = await communicateWithOpenAI(conversationHistory);
    updateChat({ role: "openai", content: `<img class="image-robo-chat" src="../../../images/chat/icon-chat.png" alt="image" style="width: 25px; height: 25px;"> ${response.content}` });
  };

  // Lidar com envio de mensagem pelo usuário
  const handleUserMessage = async () => {
    const message = inputChat.value.trim();
    if (!message) return;
    await sendUserMessageToOpenAI(message);
  };

  // Adicionar evento de clique para o botão de enviar mensagem
  btnEnviarChat.addEventListener("click", handleUserMessage);

  // Adicionar evento de pressionar a tecla "Enter" para o input de chat
  inputChat.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleUserMessage();
      inputChat.value = "";
    }
  });

  return viewEl;
};

// Criar elemento de visualização
const createViewElement = (user) => {
  const viewEl = document.createElement("div");
  viewEl.classList.add("background");
  viewEl.innerHTML = `
    <main class="container__main">
      <div class="content-main">
        <section class="chat-content individual">
          <div class="container__header">
            <img src="${user.imageUrlChat}" alt="image" style="width: 50px; height: 50px;">
            <div class="container__name">
              <h3>${user.name}</h3>
              <p>${user.quote}</p>
            </div>

            <div id="messageError" class="error-message hide"></div>

          </div>
        </section>

        <section id="chat">
          <div id="messages"></div>
        </section>

        <div id="openai_digitando"></div>

        <section class="container__input relative">
          <div class="container_input__chat">
            <input class="input__chat" id="input__chat" type="text" placeholder="Digite sua pergunta?" />
            <button id="btn_enviar_chat">
              Enviar
              <i class='fas fa-location-arrow fa-lg'></i>
            </button>
          </div>
        </section>
      </div>
    </main>
  `;
  return viewEl;
};

// Inserir cabeçalho antes do elemento de visualização
const insertHeaderBefore = (viewEl) => {
  const headerData = {
    img: {
      src: viewEl.querySelector("img").getAttribute("src"),
      alt: "Image users",
    },
  };

  const rootElement = document.getElementById("root");
  rootElement.insertAdjacentElement("beforebegin", Header(headerData));
};
