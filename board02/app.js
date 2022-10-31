//뷰(vue)객체 생성
//router하면 여기서 부터 많이 바뀜

import myHeader from './components/header.js'
import router from './router/router.js'

//main
let template = `
<div>
    <my-header v-bind:parentData.sync="this.$data"></my-header>
    <router-view></router-view>
</div>`

//vue
new Vue({
    el: '#app',
    template : template,
    data: {
        dataArray: {}, //파일에서 읽은 데이터
    },
    components: {
        myHeader // == myHeader : myHeader == 'my-header' : myHeader
    },
    methods: {
        getParentData : function(){
            return this.dataArray['board'];
        },
        setParentData : function(dataList){
            this.dataArray['board'] = dataList;
        }
    },
    router // router : router

});