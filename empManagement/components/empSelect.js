let template = `
<div>
    <table id="list">
        <!-- header --> 
            <tr>
                <th v-for="info in headerInfo">{{ info }}</th>
            </tr>

        <!-- body -->
        <!-- 실제 모든 컬럼중, 지정한 컬럼만 받아올거 -->
        <!-- <tr></tr> -> 한 사원에 대한 정보 -> v-for="empInfo in empList" -->
        <!-- <td></td> -> 한 사원이 가지는 항목 -> v-for="info in empInfo" / 한 사원이 가지는 모든 컬럼에 대해 접근 할때 --> 
        <!-- <td></td> -> 한 사원이 가지는 항목 중에서 출력될 항목 -> v-for="info in headerInfo" -> empInfo[info] --> 

        <template v-for="empInfo in empList"> <!-- 반복하는 주체, 10개면 10번 .. -->
            <router-link tag="tr" 
                        v-bind:to="{ name : 'empRead', params : { empId : empInfo.employee_id }}">
                    <td v-for="info in headerInfo"> {{ empInfo[info] }} </td>
                    </router-link>
                    </template>
                    </table>
                    <!-- 페이지 네이션 -->
                    <router-link tag="button" v-bind:to="{ name : 'empWrite' }">직원등록</router-link>
                    </div>`
                    // <!-- {{ empInfo[info] }} -> {{}}안 담아줘서 오류 --> 
                    
//컴포넌트를 empSelect변수에 담아줌
const empSelect = {
    template,
    data: function () {
        return {
            headerInfo: ['employee_id', 'first_name', 
                        'last_name', 'email', 'job_id'],
            empList: []
        }
    },
    created : function(){
    //여기서 ajax or fetch 암거나 사용

        const vueObject = this; // 1-1) 컴포넌트에 접근 vue나 component객체

        $.ajax ({
            //1-2) ajax -> this = jQuery객체 

            url : 'http://192.168.0.2:8081/myserver/empSelect',
            type : 'get',
            //data : { id : 30 }, => where 로 해당 값만 불러오는 경우가 아니어서 필요 없음
            dataType : 'json',
            success : function(data){
                console.log('emp select data : ' ,data);
                if(data != null){
                    vueObject.empList = data;
                }
            },
            error : function(reject){
                console.log(reject);
            }
        });
    }
};

export {
    empSelect
}; //한 파일에 여러개 export가능 