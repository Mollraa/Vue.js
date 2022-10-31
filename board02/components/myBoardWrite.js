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
           let dataList = this.$parent.getParentData();

           let no = 1; //default
            if(dataList.length != 0){
                let index = dataList.length -1;
                no = parseInt(dataList[index].no) + 1;
            } //넘버값 가져옴

            let boardInfo = {
                'no' : no,
                'title' : this.title,
                'content' :this.content,
                'view' : 1
            } //가져온 넘버값 처리

            dataList.push(boardInfo);

            this.$parent.setParentData(dataList);

            this.$router.push({ name : 'boardList' });
        }
    }
}