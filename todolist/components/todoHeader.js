//할 일 등록

let template = `
<div id="myDIV" class="header">
  <h2>My To Do List</h2>
  <input type="text" v-model="title" placeholder="Title...">
  <span v-on:click="addItem" class="addBtn">Add</span>
</div>`
// => 입력받는 값이있는지(input)
// id="myInput" -> v-model="title" 뷰는 입력시 양방향 디렉티브 model사용 이름은 내가하고싶은거
// onclick="newElement()" -> v-on:click="addItem"로 바꿈

export default {
    template: template,
    data: function () {
        return {
            title: '', //프로퍼티
        }
    },
    methods: {
        //v-on:click="addItem"
        addItem: function () {
            const component = this; //프로퍼티랑 연결된 컴포넌트 
            
            $.ajax({
                url : 'http://localhost:8081/java/todoInsert',
                type : 'post',
                //오브젝트 = 객체 = 클래스 
                data : JSON.stringify({ id : 0 ,
                        contents : component.title }),
                        //연결된 프로퍼티 + 에 연결된 컴포넌트 들고옴
                        // :으로 묶어줌 셋뚜셋뚜
                contentType : 'application/json',
                dataType : 'json',
                success : function(data){
                    if(data != null) {
                        //component.$router.go(0); //mode : hash
                        console.log('insert data :' ,  data);
                        console.log('result : ', data.result);
                        console.log('count : ', data.count);
                    }
                }, 
                error : function(reject){
                    console.log(reject);
                }
            });
        }
    }
};