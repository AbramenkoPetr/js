'use strict';
var cartAll = new Array(6);
cartAll[0] = ["ELLERY X M'O CAPSULE", 0, 52.50, 0];
cartAll[1] = ["ELLERY X M'O", 0, 42.00, 0];
cartAll[2] = ["ELLERY X", 0, 38, 0];
cartAll[3] = ["ELLERY", 0, 12, 0];
cartAll[4] = ["M'O CAPSULE", 0, 33, 0];
cartAll[5] = ["CAPSULE", 0, 49, 0];

const clickCart = document.querySelector('.cartIconWrap');
clickCart.addEventListener('click', cartOnOf);
function cartOnOf() {
    document.querySelector('.cart').classList.toggle('hidden');
}

const elFeaturedItems = document.querySelector('.featuredItems');
elFeaturedItems.addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
        return;
    }
    let iId = event.target.closest('.featuredItem').id;
    cartAll[iId] [1] = cartAll[iId] [1] + 1;
    
    const elCartItem = document.querySelector('.cartItem2');
    elCartItem.innerHTML = '';
        
    let count = 0;
    let cartAllS = 0;
    for(let i = 0; i<6; i++) {
    if(cartAll[i] [1] != 0) {
        cartAll[i] [3] = cartAll[i] [1] * cartAll[i] [2];
        cartAllS = cartAllS + cartAll[i] [3];
        count ++;
        for(let j = 0; j<4; j++)    {
        
        const cartAllI = `<div> ${cartAll[i] [j]} </div>`;
        elCartItem.innerHTML += cartAllI;
        }
    }
 }
 document.querySelector(".totalPrice").innerHTML = 'Товаров в корзине на сумму $' + cartAllS;
 document.querySelector(".count").innerHTML = count;
})