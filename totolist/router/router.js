
// component : selectItems 여기가고 싶으니까 주소알려줘~
import selectItems from '../components/selectItems.js'; //내가 있는 곳 기준 위치 잘 잡아주자.

// import <-> export 셋뚜셋뚜, default는 이름없이 내보내기 의미.
export default new VueRouter ({
    
    //새로고침시 hash, history(router안먹음)하면 엉뚱한 경로로 들어감
    mode : 'hash', //우리가 세로고침 하는 이유 : 리로드때문, 라우터사용해서 그럼. 잘안씀 
    routes : [
        {
            //경로 : root암거나 상관없음
            path : '/',
            //경로 이름
            name : 'todoList',
            //컴포넌트
            component : selectItems
        },
        {
            path :'*',
            redirect : '/'
            // component : errorPage -> 위의 경로가 아닐때 오류페이지를 보여주고 싶을때 사용
        }
    ]
})