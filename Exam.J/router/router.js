import main from '../components/main.js'
import myBoardList from '../components/myBoardList.js'
import myBoardRead from '../components/myBoardRead.js'
import myBoardWrite from '../components/myBoardWrite.js'

export default new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'main',
            component: main
        },
        //boardList
        {
            path: '/boardList',
            name: 'boardList',
            component: myBoardList
        },

        //boardRead - 한 건을 상세조회
        {
            path: '/boardRead/:item',
            name: 'boardRead',
            component: myBoardRead,
            props: true
        },

        //boardWrite
        {
            path: '/boardWrite',
            name: 'boardWrite',
            component: myBoardWrite
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});