import loadStyle from "../../styleLoader.js";

export const Footer = () => {
  loadStyle('./components/Footer/style.css');

  const footer = document.createElement('footer');
  footer.classList.add('container');

  footer.innerHTML = `
    <footer class="footer">

      <div class="container__footer">
      <a href="/" class="link__logo">
          <img class="image__logo" src="./images/logoDesktop.png" alt="Logo DataverseChat" />
      </a>
        <div class="socialIcons">
        <a href="https://github.com/in/elizabetefabri" target="_blank">

        </a>
        <a href="https://github.com/elizabetefabri" target="_blank">

        </a>
        </div>
      </div>

      <p>dataverseChat© 2024 Desenvolvido por Elizabete</p>
    </footer>
  `;
  return footer;
}
