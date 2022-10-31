export default {
    template :`
    <div>
        <table id="list">
            <tr>
                <td style="width:500px;">글제목</td>
                <td>{{ item.title }}</td>
            </tr>
            <tr style="heigth:600px;">
                <td colspan="2">{{ item.content }}</td>
            </tr>
        </table>
        <router-link tag="button"
                    style="float:right;"
                    v-bind:fo="{ name : 'boardList'}>목록</router-link>
    </div>`,
    props : ['item']
};