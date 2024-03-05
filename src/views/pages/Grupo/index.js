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
    subTitle: `24 membros, e tem 24 digitando...`,
  },
};

// Função para atualizar o chat com uma nova mensagem
const updateChat = (message) => {
  const messages = document.querySelector("#messages");
  messages.insertAdjacentHTML('beforeend', `<div class="${message.role}-message">${message.content}</div>`);
};

// Função para enviar mensagem para um usuário específico
const sendMessageToUser = async (user) => {
  try {
    // Envia uma mensagem para o usuário atual e espera pela resposta da OpenAI
    const resposta = await communicateWithOpenAI([{ role: "user", content: user.name }]);
    // Atualiza o chat com a resposta da OpenAI
    updateChat({ role: "openai", content: ` ${resposta.content}` });
  } catch (error) {
    // Se houver um erro ao enviar a mensagem, loga o erro no console
    console.error(`Erro ao enviar mensagem para ${user.name}:`, error);
  }
};

// Função para enviar mensagens para todos os usuários do grupo
const sendMessagesToAllUsers = async () => {
  // Define o texto indicando que as mensagens estão sendo enviadas para todos os usuários
  const openai_digitando = document.querySelector("#openai_digitando");
  openai_digitando.textContent = "Enviando mensagens para todos os usuários...";
  const users = data;
  // Cria uma lista de promessas para enviar mensagens para cada usuário usando a função sendMessageToUser
  const userPromises = users.map(sendMessageToUser);
  try {
    // Aguarda que todas as promessas sejam resolvidas usando Promise.all
    await Promise.all(userPromises);
  } catch (error) {
    // Se houver um erro ao enviar mensagens para todos os usuários, loga o erro no console
    console.error("Erro ao enviar mensagens para todos os usuários:", error);
  } finally {
    // Limpa o texto indicando que as mensagens estão sendo enviadas
    openai_digitando.textContent = "";
  }
};

export const Grupo = () => {
  loadStyle("./views/pages/Grupo/style.css");

  const viewEl = document.createElement("div");
  viewEl.classList.add("background");

  // const users = data;

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

  document.body.insertAdjacentHTML("beforebegin", `<header>${Header(headerData).outerHTML}</header>`);

  const cardElement = dadosUsuarios(data);
  viewEl.querySelector("#user-cards").appendChild(cardElement);

  const input__chat = viewEl.querySelector("#input__chat");
  const btn__enviar_chat = viewEl.querySelector("#btn_enviar_chat");

  const sendMessage = async () => {
    const mensagemEnviada = input__chat.value.trim();
    if (!mensagemEnviada) return;

    updateChat({ role: "user", content: `${mensagemEnviada}` });
    input__chat.value = "";
    sendMessagesToAllUsers();
  };

  input__chat.addEventListener("keypress", (event) => {
    if (event.key === "Enter") sendMessage();
  });

  btn__enviar_chat.addEventListener("click", sendMessage);

  return viewEl;
};
