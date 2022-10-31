export default {

    template: `<div>
                    <table id="list">
                        <tr>
                            <th style="width:50px;">글번호</th>
                            <th>글제목</th>
                            <th style="width:50px;">조회수</th>
                            <th style="width:70px;"></th>    
                        </tr> 
                        <!-- DATA LIST -->  
                        <tr v-for="item in object" v-bind:key="item.no">
                            <td>{{ item.no }}</td>
                            <router-link tag="td"
                                        v-bind:to="{ name : 'boardRead' , params : {'item' : item }}">
                                        {{ item.title }}</router-link>
                            <td>{{ item.view }}</td>
                            <td><button v-on:click="boardDelete(item.no)">삭제</button></td>
                        </tr>
                    </table>  
                    <!-- <button style="float:right;" v-on:click="boardWrite">글쓰기</button> -->
                    <router-link tag="button" 
                                stlye="float:right;"
                                v-bind:to="{ name : 'boardWrite'}">글쓰기</router-link>
        </div>`,

    //지금은 외부에서 들어오는게 없음. 파일 못을러오는 이유
    // => props: ['object'], //외부에서 데이터 받아올거야
    data : function(){
        return {
            object :[]
        }
    },
    created : function(){
        // console.log('created : ', this);
        this.object = this.$parent.getParentData();
    },
    methods: {
       boardDelete : function(no){
            for(let i=0; i<this.object.length; i++){
                if(this.object[i].no == no){
                    this.object.splice(i,1);
                }
            }

            this.$parent.setParentData(this.object);
       }
    }
};