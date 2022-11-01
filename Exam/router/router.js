import selectItems from '../components/selectItems.js'

export default new VueRouter({
    mode : 'history',
    routes :[
        {
            //할 일 조회, 상태 처리, 등록, 삭제
            path : '/',
            name : 'selectItems',
            component : selectItems
        },
        {
            path : '*',
            redirect : '/'
        }
    ]
})