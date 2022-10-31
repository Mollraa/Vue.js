//뷰(vue)객체 생성

import myHeader from './components/header.js'
import myBoardList from './components/myBoardList.js'
import myBoardWrite from './components/myBoardWrite.js'
import myBoardRead from './components/myBoardRead.js'


//main
let template = `
<div>
    <my-header v-bind:parentData.sync="this.$data"></my-header>
    <my-board-list v-if="listOk"
                    v-bind:object="dataArray['board']"
                    v-on:board-read="boardRead"
                    v-on:board-write="boardWrite" v-on:board-delete="boardDelete"></my-board-list>
    <my-board-read v-if="readOk" 
                    v-bind:object="boardInfo" 
                    v-on:board-list="boardList"></my-board-read>
    <my-board-write v-if="writeOk" 
                    v-on:board-list="boardList" 
                    v-on:board-save="boardSave"></my-board-write>    
</div>`


//vue
new Vue({
    el: '#app',
    template : template,
    data: {
        listOk: false,
        readOk: false,
        writeOk: false,
        dataArray: {}, //파일에서 읽은 데이터
        boardInfo: {} //선택된 게시글 정보 
    },
    components: {
        'my-header' : myHeader,
        'my-board-list': myBoardList,
        'my-board-read': myBoardRead,
        'my-board-write': myBoardWrite
    },
    methods: {
        loadData: function (event) { //파일을 읽어들이는 메소드 
            // event객체 -> 파일 정보를 어떻게 읽어들일지
            let file = event.target.files[0].name;
            console.log(file);

            if (file) {
                fetch(file)
                    .then(response => response.json())
                    .then(data => {
                        this.dataArray = data;
                        if (this.dataArray != null && this.dataArray['board']
                            .length >
                            0) {
                            this.listOk = true;
                        }
                    }).catch(err => console.log(err));
            }
        },
        boardList: function () { //게시판 목록 조회 
            this.listOk = true;
            this.readOk = false;
            this.writeOk = false;

        },
        boardWrite: function () { //게시판 글쓰기 
            this.listOk = false;
            this.readOk = false;
            this.writeOk = true;
        },
        boardRead: function (info) { //게시판 글 조회 
            // 컴포넌트 생성여부
            this.listOk = false;
            this.readOk = true;
            this.writeOk = false;

            //게시판 글 상세조회 
            this.boardInfo = info;
            //해당 글 조회수 증가 

            //this.dataArray 오류 : vue는 인스턴스 새로생성 -> this.안해주면 새로 생성된거 못찾아감...
            for (let i = 0; i < this.dataArray['board'].length; i++) {
                if (this.dataArray['board'][i].no == info.no) {
                    this.dataArray['board'][i].view = parseInt(this.dataArray['board'][
                            i
                        ]
                        .view);
                }
            }

        },
        boardSave: function (title, content) { //게시글 저장
            let no = 1;
            if (this.dataArray['board'].length != 0) {
                let index = this.dataArray['board'].length - 1;
                no = parseInt(this.dataArray['board'][index].no) + 1;
            }

            let boardInfo = {
                'no': no,
                'title': title,
                'content': content,
                'view': '1'
            }

            this.dataArray['board'].push(boardInfo);

            this.boardList();

        },
        boardDelete: function (no) { // 게시글 삭제 

            for (let i = 0; i < this.dataArray['board'].length; i++) {
                if (this.dataArray['board'][i].no == no) {
                    this.dataArray['board'].splice(i, 1);
                }
            }
        },
    },

});