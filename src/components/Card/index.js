import loadStyle from "../../styleLoader.js";

export const Card = (data) => {
  loadStyle("./components/Card/style.css");

  const ul = document.createElement("ul");
  ul.classList.add("container__card");
  ul.id = "cards";

  data.forEach((item) => {

    ul.innerHTML += `
      <li itemscope itemtype="OsMelhoresFilmes" class="contente">
        <div class="content__card">
          <a href="chat?id=${item.id}" class="link__card">
            <dl itemscope itemtype="#">
              <dt><img src="${item.imageUrl}" alt="Imagem do Filme" itemprop="${item.name}" class="image__card" /></dt>
              <dd itemprop="name" class="name__card">${item.name}</dd>
              <dd itemprop="idadePersona" class="idade__card">Sou ${item.facts.paisNascimentoPersona}, com ${item.facts.idadePersona} anos</dd>
              <dd itemprop="shortDescription" class="shortDescription__card">${item.shortDescription}</dd>
            </dl>
          </a>
        </div>
      </li>
    `;
  });
  return ul;

};
