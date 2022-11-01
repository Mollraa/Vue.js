//Read 어떤걸 클릭이벤트할지, 라우터할지 요소에 맞게 쓰임세가 중요 

let template = `
<div>
    <div>
        <!-- 사원상세정보 -->
        <template v-for="info in infos">
            <div>
                <span>{{ info }}</span>
                <span>{{ empInfo[info] }}</span>
            </div>
        </template>
    </div>
    <div>
        <!-- 버튼 => 1.수정 2.삭제 -->
        <router-link tag="button" v-bind:to="{ name: 'empWrite',
             params : { empId : empInfo.employee_id }}">
             수정</router-link>
        <button v-on:click="deleteData">삭제</button>
    </div>
</div>`

export default {
    template,
    props: ['empId'], //처리시 값을 받아옴
    data: function () {
        return {
            infos: ['employee_id', 'first_name',
                'last_name', 'email', 'job_id'
            ],
            empInfo: {}
        }
    },
    created: function () {
        //기존사원 정보출력
        const vueObject = this; //컴포넌트 정보가져옴, 원래는 ajax안에서 this.empId이렇게 불러오던거

        $.ajax({
            url: 'http://192.168.0.2:8081/myserver/empFind',
            type: 'get',
            data: {
                'employee_id' : vueObject.empId
            }, // == { employee_id(key) : vueObject.empId(value) }
            dataType: 'json',
            success: function (data) {
                console.log('단건조회 : ' , data);
                
                if (data != null) {
                    vueObject.empInfo = data;
                }
            },
            error: function (reject) {
                console.log(reject);
            }
        })
    },
    methods: {
        //삭제할 정보 보내기 
        deleteData: function () {
            const vueObject = this; //컴포넌트 정보가져옴, 원래는 ajax안에서 this.empId이렇게 불러오던거

            $.ajax({
                url: 'http://192.168.0.2:8081/myserver/empDelete',
                type: 'post',
                data: {
                    'employee_id' : vueObject.empId
                }, // == { employee_id(key) : vueObject.empId(value) }
                dataType: 'json',
                success: function (data) {
                    if (data != null) {
                        vueObject.$router.push({ name : 'empSelect' }); //삭제되면 리스트로 push
                    } else {
                        alert('해당 사원이 정상적으로 삭제되지 않았습니다.');
                    }
                },
                error: function (reject) {
                    console.log(reject);
                }
            })
        }
    }
};