import Modal from "../Modal/index.js";

export const Header = (data) => {
  const header = document.createElement("header");
  header.classList.add("header");

  header.innerHTML = `
      <div class="header__container header__logo-container">
        <nav id="headerContainer" class="header__logo">
          <img class="${data.img.class}" src="${data.img.src}" alt="${data.img.alt}" />
          <div class="header__text">
            ${data.description.title ? `<p>${data.description.title}</p>` : ``}
            ${data.description.subTitle ? `<p>${data.description.subTitle}</p>` : ``}
          </div>
          <div class="header__links">
            <a href="/">Início</a>
            <a id="abrirModalClick" href="">Chave api</a>
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
