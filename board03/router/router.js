import main from '../components/main.js'
import jinBoardList from '../components/jinBoardList'
import jinBoardRead from '../components/jinBoardRead'
import jinBoardWrite from '../components/jinBoardWrite'


export default new VueRouter({
    mode : 'history',

    //router <-> routes
    routes : [
        {
            //main
            path: '/',
            name: 'main',
            component: main
        },
        {
            //boardList
            path : '/boardList',
            name : 'boardList',
            component : jinBoardList
        },
        {
            //boardRead
            path : '/boardRead/:item',
            name : 'boardRead',
            component : jinBoardRead,
            porps : true
        },
        {
            //boardWrite
            path : '/boardWrite',
            name : 'boardWrite',
            component : jinBoardWrite
        },
        {
            //default
            path: '*',
            redirect : '/'
        }

    ]
})