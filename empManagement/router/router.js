// ☆ router = 경로와 컨트롤러 매핑
import empRead from '../components/empRead.js'
import { empSelect } from '../components/empSelect.js' //{ empSelect }그때그때 지정
import empWrite from '../components/empWrite.js'

export default new VueRouter({
    //new VueRouter(별도의 생성자 기반)으로 새로운 인스턴스 생성

    //오류 : name 오타
    mode: 'history',
    routes: [
        {
            //전체조회
            path: '/',
            name: 'empSelect',
            component: empSelect
        },
        {
            //읽기 
            path: '/empRead/:empId',
            name: 'empRead',
            component: empRead,
            props : true //props속성으로 id값 받을 때 사용
        },
        {
            //쓰기 or 수정
            path : '/empWrite/:empId',
            name : 'empWrite',
            component : empWrite,
            props : true
        },
        {
            //기타
            path : '*',
            redirect : '/' //나머지 
        }
    ]
});