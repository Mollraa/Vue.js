import main from '../components/main.js'
import jinBoardList from '../components/jinBoardList.js'
import jinBoardRead from '../components/jinBoardRead.js'
import jinBoardWrite from '../components/jinBoardWrite.js'


export default new VueRouter({
    /*
    http://127.0.0.1:5500/board03/#/
    mode: 'history',
    */
    mode: 'history',

    routes: [
        //우리가 매핑시킬 것 
        //boardList
        {
            // path : '/boardList', =>메인역할 대신해서 /로 해주거나 , 그대로 쓸거면 리다이렉트 주소 수정해주기
            path : '/',
            name : 'boardList',
            component : jinBoardList
        },
        
        //boardRead - 한 건을 상세조회
        // :item(해당 값을 받아옴), props : true(받아온 걸 쓰겠다)
        {
            path : '/boardRead/:item',
            name : 'boardRead',
            component : jinBoardRead,
            props : true
        },
        
        //boardWrite
        {
            path : '/boardWrite',
            name : 'boardWrite',
            component : jinBoardWrite
        },

        {
            path : '*',
            redirect : '/'
            // redirect : '/boardList' => 이렇게 수정 
        }
    ]
});