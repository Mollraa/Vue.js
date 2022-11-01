let template = `
    <div>
        <ul id="myUL">
            <template v-for="item in itemList" >
                <li  v-bind:key="item.no"
                     v-bind:class="{ checked : item.yn }"
                     v-on:click="checkedItem(item.no)">
                        {{ item.contents }}
                        <span class="close" v-on:click="deleteItem(item.no)">x</span>
                </li>
            </template>
        </ul>
    </div>`
//  <span class="close" v-on:click="deleteItem(item.no)">x</span>만 작동하게 이벤트버블링을 막아랏
// item.yn = 제이쿼리 토글클래스랑 같


export default {
    template: template,
    data: function () {
        return {
            items: [], //서버에서 가져온 원본 데이터
            updateItem: {} //완료여부가 변경된 데이터를 별도로 저장
        }
    },
    computed: {
        itemList: function () {
            // yn필드를 추가 -> 원본데이터를 boolean 타입으로 쓸 수 있게 
            // boolean 타입의 yn 필드 추가 => items안의 객체의 todoyn 연동
            let itemArray = [];

            for (let i = 0; i < this.items.length; i++) {
                let temp = this.items[i];
                temp.yn = temp.todoyn == 1 ? true : false;
                itemArray.push(temp);
            }

            return itemArray;
        }
    },
    watch: {
        updateItem: function () {
            // 실제로 서버와 통신을 해서 업데이트 진행

        }
    },
    created: function () {
        this.loadData();
    },
    methods: {
        // 서버에 있는 데이터를 가지고 오는 것
        loadData: function () {
            const vueObject = this;

            $.ajax({
                url: 'http://192.168.0.2:8081/myserver/todoSelect',
                type: 'get',
                data: {
                    'id': id
                },
                dataType: 'json',
                success: function (data) {
                    if (data != null) {
                        vueObject.items = data;
                    }
                },
                error: function (reject) {
                    console.log(reject);
                }
            });

        },
        checkedItem: function (no) {
            // 해당 건의 스타일을 변경
            const vueObject = this;
            let nno = no;
            $.ajax({
                url: 'http://192.168.0.2:8081/myserver/todoUpdate',
                type: 'get',
                data: {
                    'id': 30,
                    'no': nno,
                    'todoyn': todoyn
                },
                dataType: 'json',
                success: function (data) {
                    if (data != null) {
                        vueObject.$router.go(0);
                    } else {
                        alert('수정 실패');
                    }
                },
                error: function (reject) {
                    console.log(reject);
                }

            });

        },
        deleteItem: function (no) {
            // 서버에 삭제되는 정보를 전달하고 정상적으로 처리되면 그때 데이터를 삭제 
            const vueObject = this;
            let nno = no;
            $.ajax({
                url: 'http://192.168.0.2:8081/myserver/todoDelete',
                type: 'get',
                data: {
                    'id': 30,
                    'no': nno
                },
                dataType: 'json',
                success: function (data) {
                    // if(typeof data === 'object'){
                    //     data = JSON.stringify({});
                    // }
                    if (data != null) {
                        //index - X, 
                        vueObject.$router.go(0);
                    }
                },
                error: function (reject) {
                    console.log(reject);
                }
            });
        }
    }
}