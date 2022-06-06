/*const products = [
    {id: 1, title: 'Notebook', img: 'laptope_014.png', price: 2000},
    {id: 2, title: 'Mouse',img: 'Мышка.png', price: 20},
    {id: 3, title: 'Keyboard',img: 'keyboard.png', price: 200},
    {id: 4, title: 'Gamepad',img: 'handhelds.png', price: 50},
];*/
var products = new Array;
var url = '/catalogData.json';
    var goods = new Array;
    const API_URL =
    'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

    var cartAll = new Array;
    //console.log(cartAll);
    var cartAllS = 0.;
    var clearContent;
    var totalPriceInn;
    var cartReset;
    var clearCart;
    
    function cartOnOf() {
        document.querySelector('.cart').classList.toggle('hidden');
    }

    class ListLoad {
        getJson(){ 
        return fetch(`${API_URL + url}`)
            .then(result => result.json())
            //.then(data => this .getData(data))
            .catch(error => {
                console.log(error);
            })
        }
    }
    const listLoad = new  ListLoad();
    listLoad.getJson().then(value => {
        
        goods = value;
        //console.log(goods);


        var products = new Array(goods.length);
        var cartAll = new Array (products.length);
        //console.log(cartAll);
        for(let i = 0; i < goods.length; i++)   {
            products[i] = {id: 0, title: '', img: '', price: 0};
            
        }
        for(let i = 0; i < products.length; i++)   {
            products[i].id = i +1;
            products[i].title = goods[i].product_name;
            products[i].img = goods[i].product_name + '.png';
            products[i].price = goods[i].price;
        }
        //console.log(products);

//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (id, title, img, price) => {
    return `<div class="product-item" id="${id-1}">
                <h3>${title}</h3>
                <img src="img/${img}" alt="">
                <p>Цена ₽${price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item.id,item.title,item.img,item.price));
    //console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);
//console.log(products[1].title);


for(let i=0; i < cartAll.length; i++)   {
    cartAll[i] = {title: '', count: 0, price: 0.0, cost: 0.0};
    
}
console.log(cartAll);
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
        .innerHTML = `Товаров в корзине на сумму ₽  ${cartAllS}`;
    }
    totalPriceInn();
    });
}
addCart();
clearCart = function() {
    cartAllS = 0;
    cartReset();
    clearContent();
    totalPriceInn();
}

});