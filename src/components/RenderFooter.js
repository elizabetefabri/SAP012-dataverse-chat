export const renderFooter = () => {
  const footer = document.createElement('footer');
  footer.classList.add('container');

  footer.innerHTML = `
    <footer>
      <div class="container__footer">
        <div class="socialIcons">
        <a href="https://github.com" target="_blank">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="https://github.com" target="_blank">
          <i class="fab fa-github"></i>
        </a>
        </div>
      </div>
      <p>dataverseChat© 2024 Desenvolvido por Elizabete e Lourdilene</p>
    </footer>
  `;
  return footer;
}
