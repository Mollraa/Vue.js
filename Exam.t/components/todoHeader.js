let template = `
<div id="myDIV" class="header">
    <h2 style="margin:5px">My To Do List</h2>
    <input type="text" v-model="title" placeholder="Title...">
    <span v-on:click="addItem" class="addBtn">Add</span>
</div>
`

export default {
    template: template,
    data: function () {
        return {
            title: ''
        }
    },
    methods: {
        //add click -> 할 일 추가

        //등 록
        // 프로퍼티 title에 있는 값을 본인 id랑 같이 서버에 전송 
        addItem: function () {
            const vueObject = this;

            $.ajax({
                url: 'http://192.168.0.2:8081/myserver/todoInsert',
                type: 'get',
                data: {
                    'id': 30,
                    'contents': contents
                },
                dattype : 'json',
                success : function(data){
                    if(data != null){
                        vueObject.$router.push({ 'class' : addBtn });
                        // vueObject.$router.go(0);
                        // this.$router.go(0);
                    } else {
                        alert('할일이 등록되지 않았습니다.');
                    }
                },
                error : function(reject){
                    console.log(reject);
                }
            })
        }
    }
};