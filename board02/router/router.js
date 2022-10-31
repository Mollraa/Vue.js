import main from '../components/main.js'
import myBoardList from '../components/myBoardList.js'
import myBoardRead from '../components/myBoardRead.js'
import myBoardWrite from '../components/myBoardWrite.js'
/*
    컴포넌트를 이용해서 if디렉티브를 하느냐 (board01)
            VS
    경로를 기반으로 컴포넌트를 교체..라우터로 페이지 전환..지금하는 방법(이게 맞음)
*/

export default new VueRouter({
    /*http://127.0.0.1:5500/board02/#/
    mode: 'history',
    */
    mode: 'history',

    routes: [
        //우리가 매핑시킬 것 들

        //main
        {
            path : '/',
            name : 'main',
            component : main
        },

        //boardList
        {
            path : '/boardList',
            name : 'boardList',
            component : myBoardList
        },
        
        //boardRead - 한 건을 상세조회
        // :item(해당 값을 받아옴), props : true(받아온 걸 쓰겠다)
        {
            path : '/boardRead/:item',
            name : 'boardRead',
            component : myBoardRead,
            props : true
        },
        
        //boardWrite
        {
            path : '/boardWrite',
            name : 'boardWrite',
            component : myBoardWrite
        },

        //default - 그 외 나머지 경로들 처리, ☆ 맨 마지막에 있어야함 ☆
        /*http://127.0.0.1:5500/board02/#/
        {
            path : '*',
            redirect : '/'
        }
        */
        {
            path : '*',
            redirect : '/'
        }
    ]
});