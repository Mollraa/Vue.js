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
    data: function () {
        return {
            object: []
        }
    },
    created: function () {
        //서버랑 직접 통신

        const vueObject = this;

        $.ajax({
            url: 'http://192.168.0.2:8081/myserver/boardList',
            type: 'get',
            data: {
                'id': 30
            }, //id필수(ipconfig), 데이터는 무조건 오브젝트로 처리 
            dataType: 'json',
            success: function (data) {
                // console.log(this);
                // console.log(data);
                vueObject.object = data;
            },
            error: function (reject) {
                console.log(reject);
            }
        });
    },
    methods: {
        boardDelete: function (no) {
            let index = 0;
            for (let i = 0; i < this.object.length; i++) {
                if (this.object[i].no == no) {
                    //기존에 자른거 1. - this.object.splice(i, 1);
                    index = i;
                    break;
                }
            }
            //1.자르고 통신 2.통신하고 자름
            //1. this.$parent.setParentData(this.object);

            //2.
            const VueObject = this;
            $.ajax({
                url: 'http://192.168.0.2:8081/myserver/boardDelete',
                type: 'post',
                data: {
                    'id': 30,
                    'no': no
                }, //하나,둘 상관없이 무조건 {}로 보내기, 너가 가진 변수중에 여기에 값을 넣어주세요! 하는 의미 
                dataType: 'json',
                success: function (data) {
                    // console.log(data);

                    //통신이 성공하면
                    if (data != null) {
                        VueObject.object.splice(index, 1);
                    } else {
                        alert('정상적으로 삭제되지 않았습니다. ');
                    }
                    //v-for이 알아서 돌아감. vue는 데이터가 중심 데이터가 늘어나면 그걸 중심으로 동작, 줄어들면 줄어든 데로 알아서 뿌려줌
                },
                error: function (reject) {
                    console.log(reject);
                }
            });
        }
    }
};