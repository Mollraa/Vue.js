//진입로 -> 실제동작 vue(크게 데이터 건들건 없음)

import empHeader from './components/empHeader.js'
import router from './router/router.js'
//import router from './router/router.js' 경로오류

let template = `
<div>
    <!-- 어떤 페이지에 있어도 사원정보목록이 root로 보이게 -->
    <emp-header></emp-header>
    <router-view></router-view>
</div>`

new Vue({
    el :'#app',
    template,  // template : template
    components : {
        empHeader // empHeader : empHeader
    }, 
    router // router : router
});