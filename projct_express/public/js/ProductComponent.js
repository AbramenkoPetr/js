Vue.component('products', {
   data(){
       return {
           catalogUrl: '/catalogData.json',
           filtered: [],
           products: [],
           imgProduct: ''
       }
   },
    mounted(){
        
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
                
            });
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
   template: /*`<div class="products">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="item.img"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`*/
               `<div class="featuredItems">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                

                :img="item.img"
                :description = "item.description"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template:/* `
            <div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}</p>
                    <button class="buy-btn" @click="$emit('add-product', product)">Купить</button>
                </div>
            </div>
    `*/
    `    <div class="featuredItem" >
            <div class="featuredImgWrap">
                <img :src="img" alt="Some img">
                <div class="featuredImgDark">
                    <button class="addToCart" @click="$emit('add-product', product)">
                    
                        Add to Cart
                    </button>
                </div>
            </div>
            <div class="featuredData">
                <div class="featuredName">
                {{product.product_name}}
                </div>
                <div class="featuredText">
                {{product.description}}
                </div>
                <div class="featuredPrice">
                $ {{product.price}}
                </div>
            </div>
        </div>
    `
})