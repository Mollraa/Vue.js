import myHeader from './components/myHeader.js'
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
    created : function(){
      this.loadData();  
    },
    methods: {
        getParentData : function(){
            return this.dataArray['board'];
        },
        setParentData : function(dataList){
            this.dataArray['board'] = dataList;
        },
        loadData: function () { 
       
            // (접속하는 폴더명/+file)
            fetch('/Exam.J/data/board.json')
                .then(response => response.json())
                .then(data => {
                    this.dataArray = data; //프로퍼티로 접근해서 해결
                    if (this.dataArray != null && this.dataArray['board'].length > 0) {
                        this.listOk = true;
                    }
                    //router에 강제로 push(호출)해서 리스트로 가줘~  
                    this.$router.push({ name : 'boardList'});
                    /* 헤더가 데이터를 받아서 올려줌
                    router(push접근 )랑 
                    routs(파라미터 정보접근, 해당경로로 요청이 들어옴, 경로 옮길때 마다 발생,
                    쉽게 생각하면 event객체랑 비슷)는 다름
                     */

                }).catch(err => console.log(err));
        }
    },
   
    router // router : router

});