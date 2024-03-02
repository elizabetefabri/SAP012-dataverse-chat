export const dadosUsuarios = (data) => {
  const ul = document.createElement("ul");
  ul.classList.add("#usuarios");
  ul.id = "cards";

  data.forEach((item) => {
    ul.innerHTML += `
      <li class="usuario-group">
        <a href="chat?id=${item.id}" class="usuario-list__link">
          <img src="${item.imageUrlChat}" alt="image item" style="width: 50px; height: 50px;">
          <div class="usuario-description">
              <p class="usuario-title">${item.name}</p>
              <p class="usuario-subTitle">${item.quote}</p>
          </div>
        </a>
      </li>
    `;
  });

  return ul;
};
