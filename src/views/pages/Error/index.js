
import loadStyle from "../../../components/styleLoader.js";

export const Error = () => {
  loadStyle("./views/pages/Error/style.css");

  const viewEl = document.createElement("main");
  viewEl.innerHTML = `
  <div class="container">
    <div class="imagem__error">
      <img src="../../images/error.png" alt="logo" class="image-erro">
      <h3 class="h3-error">Oops!</h3>
      <p class="p-error">A página que você procura <br> não foi encontrada.</p>
      <a href="/" id="btn-voltar-home">Voltar para Home</a>
    </div>
  </div>
  `;

  return viewEl;
}

