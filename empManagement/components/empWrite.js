// 수정, 삭제 동시 진행 => 같은 템플릿 써도 무관하기 때문

let template = `
<div>
    <form id="info" onsubmit="return false">
        <template v-for="info in infos">
            <div>
                <label v-bind:for="info"> {{ info }} </label>
                <input type="text" v-bind:id="info"
                        v-bind:name="info" v-model="empInfo[info]">
            </div>
        </template>
    </form>
    <div>
        <button v-on:click="updateMode ? updateContent() : uploadContent() ">저장</button>
        <router-link tag="button" v-bind:to="{ name : 'empSelect' }">취소</router-link>
    </div>
</div>`
// updateMode ? updateContent(true) : uploadContent(false)
export default {
    template,
    props: ['empId'], //경로에 따라오는 아이랑 이름 같게 해줌
    data: function () {
        return {
            infos: ['employee_id', 'first_name',
                'last_name', 'email', 'job_id'
            ],
            //등록시 필요한 정보
            empInfo: {
                employee_id: '',
                first_name: '',
                last_name: '',
                email: '',
                job_id: ''
            },
            //모드 전환용 정보
            updateMode: false //update모드시 false
        }
    },
    //created = form창 만들어줌
    created: function () {
        //수정모드시 empId기반으로 데이터를들고 와야 동작함
        // => empId유무 확인 후 데이터처리 -> data가 들어오면 updateMode적용  false주고 수정
        if(this.empId > 0){
            const component = this;
    
            $.ajax({
                url : 'http://192.168.0.2:8081/myserver/empFind',
                type : 'post',
                data : { 'employee_id' : component.empId },
                dataType : 'json',
                success : function(data){
                    if(data != null){
                       component.empInfo = data;
                        component.updateMode = true;
                    } else {
                        alert('정상적으로 수정되지 않았습니다.');
                    }
                },
                error : function(reject){
                    console.log(reject);
                }
            })
        }
    },
    //등록, 수정 클릭하면 동작
    methods: {
        //오류 : uploadContent, updateContent 이름 바뀜
        uploadContent: function () {
            const component = this;

            $.ajax({
                url:'http://192.168.0.2:8081/myserver/empInsert',
                type: 'post',
                data: component.empInfo,
                dataType: 'json',
                success : function(data){
                    if(data != null){
                        component.$router.push({ name : 'empSelect' });
                    } else {
                        alert('정상적으로 등록되지 않았습니다.');
                    }
                }, 
                error : function(reject){
                    console.log(reject);
                }
            })
        },
         updateContent: function (){
            const component = this;

            $.ajax({
                url:'http://192.168.0.2:8081/myserver/empUpdate',
                type: 'post',
                data: component.empInfo,
                dataType: 'json',
                success : function(data){
                    if(data != null){
                        component.$router.push({ name : 'empSelect' });
                    } else {
                        alert('정상적으로 수정되지 않았습니다.');
                    }
                }, 
                error : function(reject){
                    console.log(reject);
                }
            })
        }
    }
};