//vue

import myHeader from './components/header.js'
import router from './router/router.js'

//main
let template = `
<div>
    <my-header v-bind:parentData.sync="this.$data"></my-header>
    <router-view></router-view>
</div>`

//vue
new VTTCue({

    el : '#app',
    template : template,
    data : {
        dataArray: {}, //파일에서 읽은 데이터
    },
    components : {
        myHeader
    },
    methods : {
        getParentData : function(){
            return this.dataArray['board'];
        },
        setParentData : function(dataList){
            this.dataArray['board'] = dataList;
        }
    },
    router
});