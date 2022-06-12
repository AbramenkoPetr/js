Vue.component('error-component', {
    props: ['error'],
    template: `
    <h1 v-if = "$parent.error" style = "text-align: center; color: red;">
    Ошибка подключения к серверу
    </h1>
    `
    
});
