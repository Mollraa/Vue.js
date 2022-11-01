//vue

import router from './router/router.js'
//헤더역할이 필요없어짐

//main
let template = `
<div>
    <router-view></router-view>
</div>`

//vue
new Vue({
    el : '#app',
    template : template,
    router
});