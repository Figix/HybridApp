/*이 변수를 기준으로 만듬 →*/var NbyN=4;
//#region  blockprefab 구조 생성
/* 실제 위치 값 */
class Grid{
    constructor(x,y){
        this.X=x
        this.Y=y
    }
}
/* 엘리먼트 */
var pos = document.getElementsByClassName("position")
class BlockPrefab{
    constructor(grid,value,elementsinfo){
        this.Grid=grid      //위치
        this.Value=value    //값
        this.Elementsinfo=elementsinfo  //elements
        this.Added=true //true로 되어있어야지 if(true && true) 처리하기 쉬움
        this.Block=true
        this.BeginPos=new Grid(0,0)
        this.V=new Grid(0,0)
        this.EndPos=new Grid(0,0)
        this.count=0
        this.switch1=false
        this.switch2=false
    }
}
/* js에서 다룰 구조체 */
var blockPrefab = Array.from(Array(NbyN), () => new Array(NbyN).fill(0))
for(var i=0;i<NbyN;i++){
    for(var j=0;j<NbyN;j++){
        blockPrefab[i][j]=new BlockPrefab()
        blockPrefab[i][j].Grid=new Grid(j*100,i*100+200)
        blockPrefab[i][j].Value=0
        blockPrefab[i][j].count=0
        blockPrefab[i][j].Elementsinfo=pos[(i*NbyN)+j]
        blockPrefab[i][j].Elementsinfo.style.marginTop = blockPrefab[i][j].Grid.Y+"px";
        blockPrefab[i][j].Elementsinfo.style.marginLeft = blockPrefab[i][j].Grid.X+"px";
    }
}
/* CSS class List */
let classNameList = new Array(11)
for(let z=0;z<classNameList.length;z++){
    classNameList[z]='block_'+Math.pow(2,z+1)
}
/*score*/
var score=0
var scoreBoard=document.getElementById("scoreBoard")
/*---------------------------------------------버튼 초기화 부분---------------------------------------------------------*/
let btn = document.getElementsByClassName("btn")
btn[0].addEventListener("click",function(event){
    clearInterval(move_animation_right)
    clearInterval(move_animation_Down)

    /* 블럭 값 관련 초기화 */
    for(var i=0;i<NbyN;i++){
        for(var j=0;j<NbyN;j++){
            blockPrefab[i][j].Value=0
            blockPrefab[i][j].count=1
            blockPrefab[i][j].switch1=false
            blockPrefab[i][j].switch2=false
        }
    }
    anime_bool=true

    /*score 초기화*/
    score=0
    fillScore(score)
    /* 시작 랜덤 값 추가 */
    Random_generator(true)
    setBeginPos()
})
/*---------------------------------------------------------------------------------------------------------------------*/
//#endregion

//#region       blockprefab관련 함수들
function Random_generator(aaa){ //매개변수가 true: 2or4, false: 2 생성, return값 true : 생성가능, false:생성불가 
    let num=2
    if(aaa){
        let tmp = Math.floor(Math.random()*(2))+1
        if(tmp==1){num=2}
        else if(tmp==2){num=4}
    }
    
    let count=0
    for(var i=0;i<NbyN;i++){
        for(var j=0;j<NbyN;j++){
            if(blockPrefab[i][j].Value == 0){    //count를 통해 배열안 0의 갯수 찾기
                count++
            }
        }
    }

    if(count==0){return false}
    let rnd = Math.floor(Math.random()*(count-1))+1
    count=0
    for(let i=0;i<NbyN;i++){
        for(let j=0;j<NbyN;j++){
            if(blockPrefab[i][j].Value == 0){
                count++
                if(count==rnd){
                    blockPrefab[i][j].Value=num

                    fillStyle()
                    return true
                }
            }
        }
    }
    return true
}

function removeStyle(){
    for(let i=0;i<NbyN;i<i++){  //모든 사각형 배열안 클래스 지우기
        for(let j=0;j<NbyN;j++){
            for(let z=0;z<classNameList.length;z++){
                blockPrefab[i][j].Elementsinfo.classList.remove(classNameList[z]);    
            }
        }
    }
}

function fillStyle(){   //Vaule값에 맞추어서 그리기
    removeStyle()
    for(let i=0;i<NbyN;i<i++){
        for(let j=0;j<NbyN;j++){
            switch(blockPrefab[i][j].Value){
                case 2:
                    blockPrefab[i][j].Elementsinfo.classList.add(classNameList[0])
                    break
                case 4:
                    blockPrefab[i][j].Elementsinfo.classList.add(classNameList[1])
                    break
                case 8:
                    blockPrefab[i][j].Elementsinfo.classList.add(classNameList[2])
                    break
                case 16:
                    blockPrefab[i][j].Elementsinfo.classList.add(classNameList[3])
                    break
                case 32:
                    blockPrefab[i][j].Elementsinfo.classList.add(classNameList[4])
                    break
                case 64:
                    blockPrefab[i][j].Elementsinfo.classList.add(classNameList[5])
                    break
                case 128:
                    blockPrefab[i][j].Elementsinfo.classList.add(classNameList[6])
                    break
                case 256:
                    blockPrefab[i][j].Elementsinfo.classList.add(classNameList[7])
                    break
                case 512:
                    blockPrefab[i][j].Elementsinfo.classList.add(classNameList[8])
                    break
                case 1024:
                    blockPrefab[i][j].Elementsinfo.classList.add(classNameList[9])
                    break
                case 2048:
                    blockPrefab[i][j].Elementsinfo.classList.add(classNameList[10])
                    break
                default:    //0일 때
                    break
            }       
        }
    }
    for(let i=0;i<NbyN;i++){
        for(let j=0;j<NbyN;j++){
            blockPrefab[i][j].Elementsinfo.innerHTML=blockPrefab[i][j].Value
        }
    }
}

function printMatrix(){ //Vaule값 보여주기
    console.log(blockPrefab[0][0].Value+" "+blockPrefab[0][1].Value+" "+blockPrefab[0][2].Value+" "+blockPrefab[0][3].Value)
    console.log(blockPrefab[1][0].Value+" "+blockPrefab[1][1].Value+" "+blockPrefab[1][2].Value+" "+blockPrefab[1][3].Value)
    console.log(blockPrefab[2][0].Value+" "+blockPrefab[2][1].Value+" "+blockPrefab[2][2].Value+" "+blockPrefab[2][3].Value)
    console.log(blockPrefab[3][0].Value+" "+blockPrefab[3][1].Value+" "+blockPrefab[3][2].Value+" "+blockPrefab[3][3].Value)
}

function fillScore(num){
    scoreBoard.innerHTML="Score : "+num.toString()
}
function setBeginPos(){
    for(let i=0;i<NbyN;i++){
        for(var j=0;j<NbyN;j++){
            if(blockPrefab[i][j].Value==0){
                blockPrefab[i][j].BeginPos=new Grid(j,i)
            } else{
                blockPrefab[i][j].BeginPos=new Grid(j,i)
                console.log("X : "+blockPrefab[i][j].BeginPos.X+",Y : "+blockPrefab[i][j].BeginPos.Y)
            }
            blockPrefab[i][j].count=1
            blockPrefab[i][j].switch1=false
            blockPrefab[i][j].switch2=false
        }
    }
}

//#endregion

//#region 키보드 입력 관련
document.addEventListener('keydown', (event) => { keystate(event) });
// window.onkeydown = (e)=>keystate(e); 이런 방식도 존재함
var anime_bool=true;
var move_animation_right
var move_animation_Down
function keystate(event){
    switch(event.code){
        case "ArrowRight":
            if(anime_bool){
                console.log(event);
                move_Right()
                anime_bool=false;
                move_animation_right = setInterval(moving_plus,1000/30)
            }
            break;
            

        case "ArrowLeft":
            if(anime_bool){
                console.log(event)
                move_Left()
                anime_bool=false
                move_animation_Down = setInterval(moving_minus,1000/30)
            }
            break;

        case "ArrowUp":
            if(anime_bool){
                console.log(event)
                move_Up()
                anime_bool=false
                move_animation_Down = setInterval(moving_minus,1000/30)
            }
            break;

        case "ArrowDown":
            if(anime_bool){
                console.log(event);
                move_Down()
                anime_bool=false;
                move_animation_right = setInterval(moving_plus,1000/30)
            }
            break;
    }
}

var c=0
var vector

function moving_plus(){
    

    for(let i=0;i<NbyN;i++){
        for(let j=0;j<NbyN;j++){

            let test1 = blockPrefab[i][j].BeginPos.Y
            let test2 = blockPrefab[i][j].BeginPos.X
            let ttest1 = blockPrefab[i][j].EndPos.Y
            let ttest2 = blockPrefab[i][j].EndPos.X

                blockPrefab[test1][test2].switch=2
                if( parseFloat(blockPrefab[ttest1][ttest2].Elementsinfo.style.marginLeft) > parseFloat(blockPrefab[test1][test2].Elementsinfo.style.marginLeft) ){
                    blockPrefab[test1][test2].Elementsinfo.style.marginLeft = parseInt(blockPrefab[test1][test2].Elementsinfo.style.marginLeft) + parseInt(blockPrefab[i][j].V.X) + "px"
                } else { 
                    blockPrefab[test1][test2].switch1=true
                    blockPrefab[test1][test2].Elementsinfo.style.marginLeft =  parseInt(blockPrefab[ttest1][ttest2].Elementsinfo.style.marginLeft)+"px"
                }
                console.log("1 : "+blockPrefab[test1][test2].switch1)
                if( parseFloat(blockPrefab[ttest1][ttest2].Elementsinfo.style.marginTop) > parseFloat(blockPrefab[test1][test2].Elementsinfo.style.marginTop)){
                    blockPrefab[test1][test2].Elementsinfo.style.marginTop = parseInt(blockPrefab[test1][test2].Elementsinfo.style.marginTop) + parseInt(blockPrefab[i][j].V.Y) + "px"            
                } else {
                    blockPrefab[test1][test2].switch2=true
                    blockPrefab[test1][test2].Elementsinfo.style.marginTop = parseInt(blockPrefab[ttest1][ttest2].Elementsinfo.style.marginTop)+"px"
                }
                console.log("2 : "+blockPrefab[test1][test2].switch2)
            
        }
    }

    var switchcounter=0
    for(let i=0;i<NbyN;i++){
        for(let j=0;j<NbyN;j++){
            if((blockPrefab[i][j].switch1==true) && (blockPrefab[i][j].switch2==true)){
                switchcounter++
            }
        }
    }

    if(switchcounter==16){
        fillStyle()
        fillScore(score)
        for(let i=0;i<NbyN;i++){
            for(let j=0;j<NbyN;j++){
                blockPrefab[i][j].Added=true
                blockPrefab[i][j].Block=true
                blockPrefab[i][j].count=1
                blockPrefab[i][j].Elementsinfo.style.marginTop=  blockPrefab[i][j].Grid.Y+"px";
                blockPrefab[i][j].Elementsinfo.style.marginLeft= blockPrefab[i][j].Grid.X+"px";
            }
        }
        Random_generator(false)
        setBeginPos()
        clearInterval(move_animation_right)
        clearInterval(move_animation_Down)
        anime_bool=true
    }
}
function moving_minus(){
    for(let i=0;i<NbyN;i++){
        for(let j=0;j<NbyN;j++){

            let test1 = blockPrefab[i][j].BeginPos.Y
            let test2 = blockPrefab[i][j].BeginPos.X
            let ttest1 = blockPrefab[i][j].EndPos.Y
            let ttest2 = blockPrefab[i][j].EndPos.X

                blockPrefab[test1][test2].switch=2
                if( parseFloat( blockPrefab[ttest1][ttest2].Elementsinfo.style.marginLeft ) < parseFloat(blockPrefab[test1][test2].Elementsinfo.style.marginLeft) ) {
                    blockPrefab[test1][test2].Elementsinfo.style.marginLeft = parseInt(blockPrefab[test1][test2].Elementsinfo.style.marginLeft) + parseInt(blockPrefab[i][j].V.X) + "px"
                } else {
                    blockPrefab[test1][test2].switch1=true
                    blockPrefab[test1][test2].Elementsinfo.style.marginLeft = parseInt(blockPrefab[ttest1][ttest2].Elementsinfo.style.marginLeft)+"px"
                }
                console.log("1 : "+blockPrefab[test1][test2].switch1)

                if( parseFloat( blockPrefab[ttest1][ttest2].Elementsinfo.style.marginTop ) < parseFloat(blockPrefab[test1][test2].Elementsinfo.style.marginTop) ) {
                    blockPrefab[test1][test2].Elementsinfo.style.marginTop = parseInt(blockPrefab[test1][test2].Elementsinfo.style.marginTop) + parseInt(blockPrefab[i][j].V.Y) + "px"
                } else {
                    blockPrefab[test1][test2].switch2=true
                    blockPrefab[test1][test2].Elementsinfo.style.marginTop = parseInt(blockPrefab[ttest1][ttest2].Elementsinfo.style.marginTop)+"px"
                }
                console.log("2 : "+blockPrefab[test1][test2].switch2)
        }
    }

    var switchcounter=0
    for(let i=0;i<NbyN;i++){
        for(let j=0;j<NbyN;j++){
            if( (blockPrefab[i][j].switch1==true) && (blockPrefab[i][j].switch2==true) ){
                switchcounter++
            }
        }
    }

    if(switchcounter==16){
        fillStyle()
        fillScore(score)
        for(let i=0;i<NbyN;i++){
            for(let j=0;j<NbyN;j++){
                blockPrefab[i][j].Added=true
                blockPrefab[i][j].Block=true
                blockPrefab[i][j].count=1
                blockPrefab[i][j].Elementsinfo.style.marginTop=  blockPrefab[i][j].Grid.Y+"px";
                blockPrefab[i][j].Elementsinfo.style.marginLeft= blockPrefab[i][j].Grid.X+"px";
            }
        }
        Random_generator(false)
        setBeginPos()
        clearInterval(move_animation_right)
        clearInterval(move_animation_Down)
        anime_bool=true
    }
}

/*오른쪽 이동 */
function move_Right(){
    /*위치 계산 완료*/
    Right_index()

    /*Grid형태 Vector*/
    vector=new Grid(50,0)
    /*Grid형태 EndPos*/
    for(let i=0;i<NbyN;i++){
        for(let j=0;j<NbyN;j++){
            if(blockPrefab[i][j].BeginPos.X>=0){
                console.log("i : "+i+", j : "+j+", "+blockPrefab[i][j].BeginPos.X+" "+blockPrefab[i][j].BeginPos.Y)
                console.log("i : "+i+", j : "+j+", "+blockPrefab[i][j].EndPos.X+" "+blockPrefab[i][j].EndPos.Y)    
            }
            blockPrefab[i][j].V=new Grid(0,0)
            if(j<3){blockPrefab[i][j].V=vector}
            console.log(blockPrefab[i][j].V)
        }
    }   //여기까지 EndLine인 배열 끝에 있는 VecQ를 제외한 동일한 벡터값과 EndPos를 EndLine으로 지정함
   
}
function Right_index(){
    for(let i=0;i<NbyN;i++){
        blockPrefab[i][3].EndPos=new Grid(3,i)
    }
    for(let i=0;i<NbyN;i++){
        for(let j=0;j<NbyN-2;j++){
            blockPrefab[i][j].EndPos=new Grid(j+1,i)
        }
    }
    for(let z=0;z<NbyN-1;z++){
        for(let j=NbyN-2; j>=0; j--){
            for(let i=0;i<NbyN;i++){
                if(blockPrefab[i][j+1].Value==0){        //우측 공간이 비어있을 경우
                    blockPrefab[i][j].EndPos = new Grid(j+1,i)
                    blockPrefab[i][j+1].Value=blockPrefab[i][j].Value
                    blockPrefab[i][j].Value=0
                } else{                     //우측 공간에 무엇인가 있을 경우
                    if(blockPrefab[i][j].Value==blockPrefab[i][j+1].Value){         //같은 값이 있을 경우
                        if(blockPrefab[i][j].Added&&blockPrefab[i][j+1].Added){     //조합했던 이력 확인
                            blockPrefab[i][j].EndPos = new Grid(j+1,i)
                            blockPrefab[i][j+1].Value=blockPrefab[i][j].Value+blockPrefab[i][j+1].Value
                            blockPrefab[i][j].Value=0
                            blockPrefab[i][j+1].Added=false //조합 비활성화
                            score+=100
                        }
                        else{blockPrefab[i][j].EndPos = new Grid(j,i)}
                    } 
                    else{
                        if(blockPrefab[i][j].Value!=0){  blockPrefab[i][j].EndPos = new Grid(j,i)}
                    }
                }

            }
        }
    }
}

/*왼쪽 이동 */
function move_Left(){
    Left_index()

    vector=new Grid(-50,0)

    for(let i=0;i<NbyN;i++){
        for(let j=0;j<NbyN;j++){
            blockPrefab[i][j].V=new Grid(0,0)
            if(j>0){blockPrefab[i][j].V=vector}
            console.log(blockPrefab[i][j].V)
        }
    }
}
function Left_index(){
    for(let i=0;i<NbyN;i++){
        blockPrefab[i][0].EndPos=new Grid(0,i)
    }

    for(let j=1 ; j<NbyN ; j++){
        for(let i=0 ; i<NbyN ; i++){
            blockPrefab[i][j].EndPos=new Grid(j-1,i)
        }
    }

    for(let z=0;z<NbyN-1;z++){
        for(let j=1;j<NbyN;j++){
            for(let i=0;i<NbyN;i++){
                if(blockPrefab[i][j-1].Value==0){        //우측 공간이 비어있을 경우
                    blockPrefab[i][j].EndPos = new Grid(j-1,i)
                    blockPrefab[i][j-1].Value=blockPrefab[i][j].Value
                    blockPrefab[i][j].Value=0
                } else{                     //우측 공간에 무엇인가 있을 경우
                    if(blockPrefab[i][j].Value==blockPrefab[i][j-1].Value){         //같은 값이 있을 경우
                        if(blockPrefab[i][j].Added&&blockPrefab[i][j-1].Added){     //조합했던 이력 확인
                            blockPrefab[i][j].EndPos = new Grid(j-1,i)
                            blockPrefab[i][j-1].Value=blockPrefab[i][j].Value+blockPrefab[i][j-1].Value
                            blockPrefab[i][j].Value=0
                            blockPrefab[i][j-1].Added=false //조합 비활성화
                            score+=100
                        }
                        else{blockPrefab[i][j].EndPos = new Grid(j,i)}
                    } 
                    else{blockPrefab[i][j].EndPos = new Grid(j,i)}
                }
            }
        }
    }
}

/* 상단이동 */
function move_Up(){
     /*위치 계산 완료*/
     Up_index()

     /*Grid형태 Vector*/
     var vector=new Grid(0,-50)
     /*Grid형태 EndPos*/
     for(let i=0;i<NbyN;i++){
         for(let j=0;j<NbyN;j++){
             blockPrefab[i][j].V=new Grid(0,0)
             if(i>0){blockPrefab[i][j].V=vector}
             console.log(blockPrefab[i][j].V)
         }
     }   //여기까지 EndLine인 배열 끝에 있는 VecQ를 제외한 동일한 벡터값과 EndPos를 EndLine으로 지정함
}
function Up_index(){
    for(let i=0;i<NbyN;i++){
        blockPrefab[0][i].EndPos=new Grid(i,0)
    }
    for(let j=0;j<NbyN;j++){
        for(let i=1;i<NbyN;i++){
            blockPrefab[i][j].EndPos=new Grid(j,i-1)
        }
    }
    for(let z=0;z<NbyN-1;z++){
        for(let i=1;i<NbyN;i++){
            for(let j=0;j<NbyN;j++){
                if(blockPrefab[i-1][j].Value==0){        //우측 공간이 비어있을 경우
                    blockPrefab[i][j].EndPos = new Grid(j,i-1)
                    blockPrefab[i-1][j].Value=blockPrefab[i][j].Value
                    blockPrefab[i][j].Value=0
                } else{                     //우측 공간에 무엇인가 있을 경우
                    if(blockPrefab[i][j].Value==blockPrefab[i-1][j].Value){         //같은 값이 있을 경우
                        if(blockPrefab[i][j].Added&&blockPrefab[i-1][j].Added){     //조합했던 이력 확인
                            blockPrefab[i][j].EndPos = new Grid(j,i-1)
                            blockPrefab[i-1][j].Value=blockPrefab[i][j].Value+blockPrefab[i-1][j].Value
                            blockPrefab[i][j].Value=0
                            blockPrefab[i-1][j].Added=false //조합 비활성화
                            score+=100
                        }
                        else{blockPrefab[i][j].EndPos = new Grid(j,i)}
                    } 
                    else{blockPrefab[i][j].EndPos = new Grid(j,i)
                    }
                }
            }
        }
    }
}

/* 하단이동 */
function move_Down(){
    /*위치 계산 완료*/
    Down_index()

    /*Grid형태 Vector*/
    var vector=new Grid(0,50)
    /*Grid형태 EndPos*/
    for(let i=0;i<NbyN;i++) {
        for(let j=0;j<NbyN;j++) {
            blockPrefab[i][j].V=new Grid(0,0)
            if(i<3){blockPrefab[i][j].V=vector}
            console.log(blockPrefab[i][j].V)
        }
    }   //여기까지 EndLine인 배열 끝에 있는 VecQ를 제외한 동일한 벡터값과 EndPos를 EndLine으로 지정함
}
function Down_index(){
    for(let i=0;i<NbyN;i++){
        blockPrefab[3][i].EndPos=new Grid(i,3)
    }
    for(let j=0;j<NbyN;j++){
        for(let i=0;i<NbyN-1;i++){
            blockPrefab[i][j].EndPos=new Grid(j,i+1)
        }
    }

    for(let z=0 ; z<NbyN-1 ; z++){
        for(let i=NbyN-2 ; i>=0 ; i--){
            for(let j=0 ; j<NbyN ; j++){
                if(blockPrefab[i+1][j].Value==0){        //밑측 공간이 비어있을 경우
                    blockPrefab[i][j].EndPos = new Grid(j,i+1)
                    blockPrefab[i+1][j].Value = blockPrefab[i][j].Value
                    blockPrefab[i][j].Value = 0
                } else{                                 //밑측 공간에 무엇인가 있을 경우
                    if( blockPrefab[i][j].Value == blockPrefab[i+1][j].Value ){     //같은 값이 있을 경우
                        if(blockPrefab[i][j].Added&&blockPrefab[i+1][j].Added){     //조합했던 이력 확인
                            blockPrefab[i][j].EndPos = new Grid(j,i+1)
                            blockPrefab[i+1][j].Value=blockPrefab[i][j].Value+blockPrefab[i+1][j].Value
                            blockPrefab[i][j].Value=0
                            blockPrefab[i+1][j].Added=false //조합 비활성화
                            score+=100
                        }
                        else{ blockPrefab[i][j].EndPos = new Grid(j,i) }
                    } 
                    else{blockPrefab[i][j].EndPos = new Grid(j,i)}
                }
            }
        }
    }
}