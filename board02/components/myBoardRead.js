export default {
    template: `<div>
    <!-- id하나만 되지만 컴포넌트가 달라서 가능 -->
                <table id="list">
                    <tr>
                        <td style="width:500px;">글제목</td>
                        <td>{{ item.title }} </td>
                    </tr>
                    <tr style="height:600px;">
                        <td colspan="2">{{ item.content }}</td>
                    </tr>
                </table>
                <router-link tag="button"
                            style="float:right;"
                            v-bind:to="{ name : 'boardList' }">목록</router-link>
            </div>`,
    props: ['item']
    
};