import { renderBlock } from './lib.js';
export function renderUserBlock(nameUser, linkAvatar, favoriteItemsAmount) {
    const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет';
    const hasFavoriteItems = favoriteItemsAmount ? true : false;
    //const linkAvatar = "/img/avatar.png"
    //const nameUser = "Wade Warren1"
    //console.log(favoriteItemsAmount)
    //console.log(favoritesCaption)
    renderBlock('user-block', `
    <div class="header-container">
    <p>
      <img class="avatar" src=${linkAvatar} alt="Wade Warren" />
      <div class="info">
          <p class="name">${nameUser}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `);
}
