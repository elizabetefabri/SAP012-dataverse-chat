import Modal from "../Modal/index.js";
import loadStyle from "../../styleLoader.js";

export const Header = (data) => {
  loadStyle("./components/Header/style.css");

  const linkChat = window.location.pathname.split("/").pop();

  const header = document.createElement("header");
  header.classList.add("header");

  const headerContainerClass = linkChat ? "header__logo" : "header__logo justify-content-left";

  header.innerHTML = `
      <div class="header__container header__logo-container">
        <nav id="headerContainer" class="${headerContainerClass}">
        <a href="/" class="link__logo">
          <img class="image__logo" src="./images/logoDesktop.png" alt="${data.img.alt}" />
        </a>


          <div class="header__links">
            <a href="/">Início</a>
            ${linkChat ? '' : `<a href="grupo" class="header__link">Grupo</a>`}
            <a id="abrirModalClick" href="#">Chave api</a>
          </div>
          <a id="mobile" href="#" class="icon">
            <i class="fa fa-bars"></i>
          </a>
        </nav>
        <div id="myLinks" class="header__mobile-links">
          <a href="/">Início</a>
          ${linkChat ? '' : `<a href="grupo" class="header__link">Grupo</a>`}
          <a id="abrirModalClickMobile" href="#">Chave api</a>
        </div>
      </div>
  `;

  const rootElement = document.getElementById("root");
  const abrirModalClick = header.querySelector("#abrirModalClick");
  const abrirModalClickMobile = header.querySelector("#abrirModalClickMobile");
  const mobileToggle = header.querySelector("#mobile");
  const mobileLinks = header.querySelector("#myLinks.header__mobile-links");


  abrirModalClick.addEventListener("click", () => {
    rootElement.appendChild(Modal());
  });

  abrirModalClickMobile.addEventListener("click", () => {
    rootElement.appendChild(Modal());
  });

  mobileToggle.addEventListener("click", () => {
    mobileLinks.classList.toggle("show");
  });

  return header;
};
