// 요기는 태그가 많이 달라짐 
//Vue - 해당 태그에 뭔가 들어감, 태그가 커짐 <-> 자스랑 다름 

let template = `
<div>
    <ul id="myUL">
    <template v-for="item in itemList">
    <!-- item(임시변수) in items(프로퍼티) 는 내가정함 todo in items이런식으로 암거나 -->
        <li v-bind:key="item.no"
            v-bind:class="{ checked : item.yn }"
            v-on:click="checkedItem(item.no)" >
            {{ item.contents }}
            <span class="close" v-on:click.self.stop ="deleteItem(item.no)"> X </span>
        </li>
    </template>    
    </ul>
</div>`
/*
<ul>고정 / <li>내가 등록, 삭제하는 겟수 
         => li에 v-for해도 되는데, 들어가는게 많아서 template해서 감싸줌
            자스에 있는 x체크하는 아이들 다 li에 넣어줘야함,
            span class="close"항상추가 뷰에서 따로 안만들어줌
            , todolist자스 못읽으면 자스공부하기
 */

/*
<!-- // Add a "checked" symbol when clicking on a list item -->
v-bind:class="{ checked : '제어 프로퍼티' }">  or  v-bind:class="className" 
{ checked : item.todoyn == 1 } or { checked : item.yn } - 새로운 프로퍼티로 진행 
    =>  하나의 클래스 값에 동적으로 값을 넣겠다. 유의해서보기
*/

/*
이벤트 버블링 막기
1. v-on:click="deleteItem(item.no $event)

2.  v-on:click.self.stop ="deleteItem(item.no)"
    v-on:click.stop ="deleteItem(item.no)"
*/

/*
{
        "no": "127", //할 일 번호
        "id": "0",  //id
        "contents": "fdsfs", //할 일
        "todoyn": "0" // 완료 여부 0 / 1(완료)
    },
 */

export default {
    template: template,
    data: function () {
        //insert할 것 들 
        return {
            items: [], //프로퍼티
            updateItem: {}
        }
    },
    //크리티드 - 마운드(변경된 상황을 알려줌) - 디스트리트 - 

    /*
    computed
    자동으로 움직임, 데이터나 내부에 변화되는 값을 감지, 변화감지란 이벤트가 발생하는 것, 
    그 이벤트를 감지해서 동작하는 무언가가 있어야함. 자동은 없다. 내가 다 만들어야지
    */
    computed : {
        itemList: function () {
            // item.todoyn = item.todoyn == 1 ? 0 : 1;만 감지해서 동적으로 적용되게 해줌
            return $.map(this.items, function (obj, idx) {
                obj.yn = obj.todoyn == 1 ? true : false;
                return obj;
            });
        }
    },

    watch: {
        //checkedItem에서 스타일만 변경 해줬으니, 여기서 데이터 변경. 동시에 움직이는데 동작만 다른데서 함 
        updateItem: function () {
            const component = this;

            $.ajax({
                url: 'http://localhost:8081/java/todoUpdate',
                type: 'get',
                data: component.updateItem,
                success: function (data) {
                    if (data != null) {
                        alert("update success!");
                    }
                },
                error: function (reject) {
                    console.log(reject);
                }
            });
        }
    },

    created: function () {
        this.loadData(); // 바로 안하고 methods가져와서 처리
    },
    methods: {
        loadData: function () {
            // loadData로 데이터를 가지고올거다
            const component = this;

            $.ajax({
                url: 'http://localhost:8081/java/todoSelect',
                type: 'get',
                data: {
                    id: 0
                },
                dataType: 'json',
                success: function (data) {
                    if (data.length != 0) {
                        component.items = data;

                        /*
                        $.map(data, function (obj, idx) {
                            // 배열을 넘겨주고, (checked : item.yn(새필드 생성)) fun에서 어떻게 새로운 배열을 만들지 결정
                            obj.yn = obj.todoyn == 1 ? true : false;
                            return obj;
                        });
                        */

                    }
                },
                error: function (reject) {
                    console.log(reject);
                }
            });
        },
        checkedItem: function (no) {
            //스타일만 변경
            const component = this;

            $(this.items).each(function (index, item) {
                if (item.no == no) { //기존에 가지고있는 아이템 체크
                    // item.yn = !item.yn; // 기존 값만 바꾸면 서버에 안들어감 -> 이걸 안하게 computed에서 해줌
                    item.todoyn = item.todoyn == 1 ? 0 : 1; // 스타일 변경. boolean아님, if문으로바꿔줌 
                    component.updateItem = item; //스타일을 변경시키고, 변경된 걸 임시로 넣어줌
                }
            })
        },

        deleteItem: function (no) {
            const component = this;

            /*
            1. 인덱스시 component.items.splice(index , 1);에 사용할 메소드 

            let index = 0;
            $(this.items).each(function (inx, item) {
                if (item.no == no) {
                    index = idx;
                }
            });
            */

            $.ajax({
                url: 'http://localhost:8081/java/todoDelete',
                type: 'get',
                data: {
                    id: 0,
                    no: no
                }, // no : (no)매개변수로 받아온 숫자, 컴포넌트 아님 컴포넌트쓰면 못받아옴
                dataType: 'json',
                success: function (data) {
                    if (data != null) {
                        //프로퍼티(.items) 값 변화가 핵심

                        // 1. 인덱스 만들어서 자르기 . component.items.splice(index , 1);

                        // 2. 데이터 전체를 바꿈, 즉 배열을 새로만듬($.grep)
                        component.items = $.grep(component.items, function (item) {
                            return !(item.no == no); // 논리부정 기억해☆
                        });
                    }
                },
                error: function (reject) {
                    console.log(reject);
                }
            })
        }
    }
};