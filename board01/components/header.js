export default{
    template : `
    <header>
        <h1>간단한 게시판</h1>
        <p>게시판 데이터 json 파일 읽기 </p>
        <input type="file" v-on:change="loadData($event)">
        <button v-on:click="saveBoardList">게시판 저장하기</button>
    </header>`,
    props : ['parentData'], //프로퍼티로접근
    methods : {
        loadData: function (event) { //파일을 읽어들이는 메소드
            let file = event.target.files[0].name;

            if (file) {
                fetch('data/'+file)
                // 접속하는 폴더명/+file 
                    .then(response => response.json())
                    .then(data => {
                        this.parentData.dataArray = data; //프로퍼티로 접근해서 해결
                        if (this.parentData.dataArray != null && this.parentData.dataArray['board']
                            .length >
                            0) {
                            this.parentData.listOk = true;
                        }
                        //☆ parentData 수정시 알려줘야함 
                        //sync수식어가 붙은 값이 업데이트 되었다고 부모에게 알려줌
                        this.$emit('update:parentData', this.parentData);

                    }).catch(err => console.log(err));
            }
        },
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