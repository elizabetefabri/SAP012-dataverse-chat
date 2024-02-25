import Modal from "../Modal/index.js";

export const Header = () => {
  const header = document.createElement("header");
  header.classList.add("header");

  header.innerHTML = `
      <div class="header__container">
        <nav class="header__logo">
          <img class="image__logo" src="./images/logoDesktop.png" alt="Logo DataverseChat" />
          <div class="header__links">
            <a href="">Link painel</a>
            <a id="abrirModalClick" href="#">Chave api</a>
          </div>
          <a id="mobile" href="#" class="icon">
            <i class="fa fa-bars"></i>
          </a>
        </nav>
        <div id="myLinks" class="header__mobile-links">
          <a href="">Link painel</a>
          <a id="abrirModalClickMobile" href="#">Chave api</a>
        </div>
      </div>
  `;

  const rootElement = document.getElementById("root");
  const abrirModalClick = header.querySelector("#abrirModalClick");
  const abrirModalClickMobile = header.querySelector("#abrirModalClickMobile");
  const mobileToggle = header.querySelector("#mobile");
  const mobileLinks = header.querySelector("#myLinks");

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
