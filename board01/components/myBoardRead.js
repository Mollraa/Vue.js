export default {
    template: `<div>
    <!-- id하나만 되지만 컴포넌트가 달라서 가능 -->
                <table id="list">
                    <tr>
                        <td style="width:70px;">글제목</td>
                        <td>{{ object.title }} </td>
                    </tr>
                    <tr style="height:300px;">
                        <td colspan="2">{{ object.content }}</td>
                    </tr>
                </table>
                <button style="float:right;" v-on:click="boardList">목록</button>
            </div>`,
    props: ['object'],
    methods: {
        boardList: function () {
            this.$emit('board-list');
        }
    }
};