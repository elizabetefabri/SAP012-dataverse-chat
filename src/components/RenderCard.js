export const renderCardUl = (data) => {
  const ul = document.createElement("ul");
  ul.classList.add("container__card");
  ul.id = "cards";

  data.forEach((item) => {
    ul.innerHTML += `
      <li itemscope itemtype="OsMelhoresFilmes" class="container__card">
        <div class="content__card">
          <a href="" class="link__card">
            <dl itemscope itemtype="#">
              <dt><img src="${item.imageUrl}" alt="Imagem do Filme" itemprop="${item.name}" class="image__card" /></dt>
              <dd itemprop="name" class="name__card">${item.name}</dd>
              <dd itemprop="idadePersona" class="idade__card">${item.facts.idadePersona} anos</dd>
              <dd itemprop="description" class="description__card">${item.description}</dd>
            </dl>
          </a>
        </div>
      </li>
    `;
  });
  return ul;
};
