export default {
template: `<div>
<table id="list">
    <tr>
        <td>글제목</td>
        <td><input type="text" style="width:90px;" v-model="title"></td>    
    </tr>  
    <tr>
        <td colspan="2">
            <textarea style="width:100px;" v-model="content"> </textarea>    
        </td>
    </tr>    
</table>
<button style="float:right;" v-on:click="boardList">목록</button>
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
boardList: function () {
this.$emit('board-list');

},
boardSave: function () {
this.$emit('board-save', this.title, this.content);
// this.title, this.content = 매개변수로 프로퍼티 전달

}
}
}