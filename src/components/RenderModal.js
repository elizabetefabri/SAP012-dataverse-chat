import { getApiKey, setApiKey } from "../lib/apiKey.js";

export const renderModal = () => {
  const modal = document.createElement("div");
  modal.classList.add("container__modal");

  modal.innerHTML = `
  <div id="modal">
  <a id="close__modal">X</a>
    <div class="content__modal">
      <h2>API KEY ChatGPT</h2>
      <h3>Insira uma Chave API</h3>
        <div class="input__modal">
          <input type="text" id="input__modal" />
          <button id="btn__modal">SALVAR</button>
        </div>
    </div>
  </div>
  `;

  const closeModalButton = modal.querySelector("#close__modal");
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  const inputModal = modal.querySelector("#input__modal");
  inputModal.value = getApiKey();

  const saveButton = modal.querySelector("#btn__modal");
  saveButton.addEventListener("click", () => {
    const newApiKey = inputModal.value;
    setApiKey(newApiKey);
    inputModal.value = "";

    saveButton.innerHTML = 'Salvo!';
  });

  return modal;
};

export default renderModal;
