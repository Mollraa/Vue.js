export default{
    template : `
    <header>
        <h1>자유 게시판</h1>
    </header>`,
    props : ['parentData'], //프로퍼티로접근
    methods : {
      
        saveBoardList: function () { 
            // 게시판 저장하기
            let data = this.parentData.dataArray;
            if (data.length == 0) {
                alert('저정할 게시판 내용이 없습니다!');
                return
            }

            if (typeof data === 'object') {
                data = JSON.stringify(data, undefined, 4); // object -> json으로 만들어줌
            }

            let blob = new Blob([data], { //blob : 일시적으로 다운받게 해줌 
                type: 'text/json'
            }); //서버에 저장할 수 있는 데이터의 형태가 됨 

            let a = document.createElement('a');
            a.download = 'board.json';
            a.href = window.URL.createObjectURL(
            blob); 
            a.click(); 
        }
    }
}