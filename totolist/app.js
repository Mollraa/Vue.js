//Vue생성 
// component ↑ -> new Vue ↓


//from~ 가져옴 = ./동급 vs ../상위
// => 확장자(.js)는 내가 생성해줘야함, 경로확인 필수>_<
import todoHeader from './components/todoHeader.js'; 
import router from './router/router.js';


let template = `
<div>
    <todo-header></todo-header>
    <!-- <todo-list></todo-list> -> router를 이용해서 해보기 -->
    <router-view></router-view>
</div>
`

new Vue({
    el: '#app', //필수
    template: template, //필수
    components: { //사용하기에달림
        'todo-header': todoHeader
    },
    router //사용하기에 달림
});


/*
오류 : Failed to load resource: net::ERR_FAILED
    => 쓰던 써버 (교수님) 서버 닫힘 
*/