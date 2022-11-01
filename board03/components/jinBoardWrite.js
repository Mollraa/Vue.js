export default {
    template: `<div>
                    <table id="list">
                        <tr>
                            <td>글제목</td>
                            <td><input type="text" style="width:500px;" v-model="title"></td>    
                        </tr>  
                        <tr>
                            <td colspan="2">
                                <textarea style="width:600px;" v-model="content"> </textarea>    
                            </td>
                        </tr>    
                    </table>
                   <router-link tag="button"
                                style="float:right;"
                                v-bind:to="{ name : 'boardList' }">목록</router-link>
                    <button style="float:right;" v-on:click="boardSave">저장</button>
                </div>`,
    // title, content = 입력 아니라서 porps 안함
    data: function () {
        return {
            title: '',
            content: ''
        }
    },
    methods: {
        boardSave: function () {
            //no값 서버에서 자동부여되서 필요없음.

            //보낼데이터 구성
            let boardInfo = {
                'id' : 30,
                'title' : this.title,
                'post' :this.content,
            }

            // dataList.push(boardInfo);
            // this.$parent.setParentData(dataList);
            // => 보드리스트로 가서 다시 처리해줘서 push는 필요없고 통신성공만 보면됨

            //통신성공 체크
            const VueObject = this;
            $.ajax ({
                url : 'http://192.168.0.2:8081/myserver/boardInsert',
                type : 'post',
                data : boardInfo,
                dataType : 'json',
                success : function(data){
                    // console.log(data);

                    if(data != null){
                        VueObject.$router.push({ name : 'boardList'});
                    } else {
                        alert('정상적으로 등록되지 않았습니다.');
                    }
                }, 
                error : function(reject){
                    console.log(reject);
                }
            })
        }
    }
}