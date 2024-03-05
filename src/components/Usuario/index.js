import styleLoader  from "../../styleLoader.js";
export const dadosUsuarios = (data) => {
  styleLoader("../Usuario/style.css");

  const ul = document.createElement("ul");
  ul.classList.add("user-cards");
  ul.id = "user-cards-ul";

  data.forEach((user) => {
    ul.innerHTML += `
      <li class="user-card">
        <a href="chat?id=${user.id}" class="user-card__link">
          <img src="${user.imageUrl}" alt="Imagem do usuário" style="width: 65px; height: 65px;">
          <div class="user-description">
            <p class="user-name">${user.name}</p>
            <p class="user-quote">${user.quote}</p>
          </div>
        </a>
      </li>
    `;
  });

  return ul;
};
