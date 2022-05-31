'use strict';
const cartAll = new Array (products.length);
var cartAllS = 0.;
var clearContent;
var totalPriceInn;
var cartReset;
for(let i=0; i < cartAll.length; i++)   {
    cartAll[i] = {title: '', count: 0, price: 0.0, cost: 0.0};
}
function cartOnOf() {
    document.querySelector('.cart').classList.toggle('hidden');
}
cartReset = function()  {
    for(let i=0; i < products.length; i++)  {
        cartAll[i].title = products[i].title;
        cartAll[i].count = 0;
        cartAll[i].price = products[i].price;
        cartAll.cost = 0.0;
    }
}
cartReset();
const elFeaturedItems = document.querySelector('.products');
const addCart = function() {elFeaturedItems.addEventListener('click', event => {
    if (!event.target.closest('.buy-btn')) {
        return;
    }
    let iId = event.target.closest('.product-item').id;
    console.log(cartAll[iId].count);
    cartAll[iId].count = cartAll[iId].count + 1;
    const elCartItem = document.querySelector('.cartItem2');
    clearContent = function()   {elCartItem.innerHTML = '';}
    clearContent(); 
    cartAllS = 0;
    for(let i = 0; i < cartAll.length; i++) {
        if(cartAll[i].count != 0) {
           cartAll[i].cost = cartAll[i].count * cartAll[i].price;
           const cartAllI = `
           <div> ${cartAll[i].title}</div>
           <div>${cartAll[i].count}</div>
           <div>${cartAll[i].price}</div> 
           <div>${cartAll[i].cost}</div>
           `;
           elCartItem.innerHTML += cartAllI;
           cartAllS += cartAll[i].cost;
        }
    }
    totalPriceInn = function()    {
        document.querySelector(".totalPrice")
        .innerHTML = `Товаров в корзине на сумму $  ${cartAllS}`;
    }
    totalPriceInn();
    });
}
addCart();
const clearCart = function() {
    cartAllS = 0;
    cartReset();
    clearContent();
    totalPriceInn();
}