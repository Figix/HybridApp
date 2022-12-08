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
    }
}
/* js에서 다룰 구조체 */
var blockPrefab = Array.from(Array(NbyN), () => new Array(NbyN).fill(0))
for(var i=0;i<NbyN;i++){
    for(var j=0;j<NbyN;j++){
        blockPrefab[i][j]=new BlockPrefab()
        blockPrefab[i][j].Grid=new Grid(j*100,i*100+200)
        blockPrefab[i][j].Value=0
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

/* 이벤트 Vector Queue */
class VecQList{
    constructor(){
        this.VecQ=Array.from(Array(NbyN), () => new Array(NbyN).fill(new VecQ))
    }
}
class VecQ{
    constructor(){
        this.V=new Grid(0,0)
        this.EndPos=new Grid(0,0)
        this.Value=0
    }
}
var vecQList = new VecQList()
/*-------------------버튼 초기화 부분---------------------------------------------------------*/
let btn = document.getElementsByClassName("btn")
btn[0].addEventListener("click",function(event){


    /* 블럭 값 관련 초기화 */
    for(var i=0;i<NbyN;i++){
        for(var j=0;j<NbyN;j++){
            blockPrefab[i][j].Value=0
        }
    }
    /*score 초기화*/
    score=0
    fillScore(score)
    /* 시작 랜덤 값 추가 */
    Random_generator(true)
})
/*-------------------------------------------------------------------------------------------*/
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
//#endregion

//#region 키보드 입력 관련
document.addEventListener('keydown', (event) => { keystate(event) });
// window.onkeydown = (e)=>keystate(e); 이런 방식도 존재함

function keystate(event){
    switch(event.code){
        case "ArrowRight":
            console.log(event);
            move_Right()
            Random_generator(false)
            break;
        case "ArrowLeft":
            console.log(event);
            move_Left()
            Random_generator(false)
            break;
        case "ArrowUp":
            console.log(event);
            move_Up()
            Random_generator(false)
            break;
        case "ArrowDown":
            console.log(event);
            move_Down()
            Random_generator(false)
            break;    
    }
}

/*오른쪽 이동 */
function move_Right(){
    /*index 이동 전*/
    for(let i=0;i<NbyN;i++){
        for(let j=0;j<NbyN;j++){
            vecQList.VecQ[i][j].Value=blockPrefab[i][j].Value;
            console.log(blockPrefab[i][j].Value+" "+vecQList.VecQ[i][j].Value)
        }
    }

    console.log(vecQList.VecQ[0][0].Value+" "+vecQList.VecQ[0][1].Value+" "+vecQList.VecQ[0][2].Value+" "+vecQList.VecQ[0][3].Value)
    console.log(vecQList.VecQ[1][0].Value+" "+vecQList.VecQ[1][1].Value+" "+vecQList.VecQ[1][2].Value+" "+vecQList.VecQ[1][3].Value)
    console.log(vecQList.VecQ[2][0].Value+" "+vecQList.VecQ[2][1].Value+" "+vecQList.VecQ[2][2].Value+" "+vecQList.VecQ[2][3].Value)
    console.log(vecQList.VecQ[3][0].Value+" "+vecQList.VecQ[3][1].Value+" "+vecQList.VecQ[3][2].Value+" "+vecQList.VecQ[3][3].Value)

    /*index이동 완료*/
    for(let z=0;z<NbyN-1;z++){
        Right_index()
    }
    /*Grid형태 Vector*/
    vector=calculate_Vector(blockPrefab[0][0].Grid,blockPrefab[0],[1].Grid)
    /*Grid형태 EndPos*/
    for(let i=0;i<NbyN;i++){
        for(let j=0;j<NbyN;j++){
            vecQList.VecQ[i][j].EndPos=blockPrefab[i][NbyN-1].Grid
            vecQList.VecQ[i][j].V=(0,0)
            if(j<3){vecQList.VecQ[i][j].V=vector}
        }
    }   //여기까지 EndLine인 배열 끝에 있는 VecQ를 제외한 동일한 벡터값과 EndPos를 EndLine으로 지정함
    //이후부터는 Added를 확인해서 각각의 EndPos를 조정할 예정이다
    // console.log("block")
    // console.log(blockPrefab[0][0].Block+" "+blockPrefab[0][1].Block+" "+blockPrefab[0][2].Block+" "+blockPrefab[0][3].Block)
    // console.log(blockPrefab[1][0].Block+" "+blockPrefab[1][1].Block+" "+blockPrefab[1][2].Block+" "+blockPrefab[1][3].Block)
    // console.log(blockPrefab[2][0].Block+" "+blockPrefab[2][1].Block+" "+blockPrefab[2][2].Block+" "+blockPrefab[2][3].Block)
    // console.log(blockPrefab[3][0].Block+" "+blockPrefab[3][1].Block+" "+blockPrefab[3][2].Block+" "+blockPrefab[3][3].Block)
    // console.log("Added")
    // console.log(blockPrefab[0][0].Added+" "+blockPrefab[0][1].Added+" "+blockPrefab[0][2].Added+" "+blockPrefab[0][3].Added)
    // console.log(blockPrefab[1][0].Added+" "+blockPrefab[1][1].Added+" "+blockPrefab[1][2].Added+" "+blockPrefab[1][3].Added)
    // console.log(blockPrefab[2][0].Added+" "+blockPrefab[2][1].Added+" "+blockPrefab[2][2].Added+" "+blockPrefab[2][3].Added)
    // console.log(blockPrefab[3][0].Added+" "+blockPrefab[3][1].Added+" "+blockPrefab[3][2].Added+" "+blockPrefab[3][3].Added)

    ///여기서부터 생각할것
    for(let i=0;i<NbyN;i++){
        for(let j=0;j<NbyN-1;j++){
            for(let z=NbyN-1-j;z>=1;z--){
                
            }
        }
    }
    console.log(vecQList.VecQ[0][0].EndPos.X+" "+vecQList.VecQ[0][1].EndPos.X+" "+
        vecQList.VecQ[0][2].EndPos.X+" "+vecQList.VecQ[0][3].EndPos.X)
    console.log(vecQList.VecQ[1][0].EndPos.X+" "+vecQList.VecQ[1][1].EndPos.X+" "+
        vecQList.VecQ[1][2].EndPos.X+" "+vecQList.VecQ[1][3].EndPos.X)
    console.log(vecQList.VecQ[2][0].EndPos.X+" "+vecQList.VecQ[2][1].EndPos.X+" "+
        vecQList.VecQ[2][2].EndPos.X+" "+vecQList.VecQ[2][3].EndPos.X)
    console.log(vecQList.VecQ[3][0].EndPos.X+" "+vecQList.VecQ[3][1].EndPos.X+" "+
        vecQList.VecQ[3][2].EndPos.X+" "+vecQList.VecQ[3][3].EndPos.X)
    
    fillStyle()
    fillScore(score)
    for(let i=0;i<NbyN;i++){
        for(let j=0;j<NbyN;j++){
            blockPrefab[i][j].Added=true
            blockPrefab[i][j].Block=true
        }
    }
}
function Right_index(){
    for(let j=NbyN-2; j>=0; j--){
        for(let i=0;i<NbyN;i++){
            if(blockPrefab[i][j+1].Value==0){        //우측 공간이 비어있을 경우
                blockPrefab[i][j+1].Value=blockPrefab[i][j].Value
                blockPrefab[i][j].Value=0
            } else{                     //우측 공간에 무엇인가 있을 경우
                if(blockPrefab[i][j].Value==blockPrefab[i][j+1].Value){         //같은 값이 있을 경우
                    if(blockPrefab[i][j].Added&&blockPrefab[i][j+1].Added){     //조합했던 이력 확인
                        blockPrefab[i][j+1].Value=blockPrefab[i][j].Value+blockPrefab[i][j+1].Value
                        blockPrefab[i][j].Value=0
                        blockPrefab[i][j+1].Added=false //조합 비활성화
                        score+=100
                        fillScore(score)
                    }
                } 
                else{
                    if(blockPrefab[i][j].Value!=0){ blockPrefab[i][j+1].Block=false }
                }
            }
        }
    }
}
/*왼쪽 이동 */
function move_Left(){
    for(let z=0;z<NbyN-1;z++){
        Left_index()
    }
    for(let i=0;i<NbyN;i++){
        for(let j=0;j<NbyN;j++){
            blockPrefab[i][j].Added=true
        }
    }
}
function Left_index(){
    for(let j=1;j<NbyN;j++){
        for(let i=0;i<NbyN;i++){
            if(blockPrefab[i][j-1].Value==0){        //우측 공간이 비어있을 경우   
                blockPrefab[i][j-1].Value=blockPrefab[i][j].Value
                blockPrefab[i][j].Value=0
            } else{                     //우측 공간에 무엇인가 있을 경우
                if(blockPrefab[i][j].Value==blockPrefab[i][j-1].Value){         //같은 값이 있을 경우
                    if(blockPrefab[i][j].Added&&blockPrefab[i][j-1].Added){      //조합했던 이력 확인
                        blockPrefab[i][j-1].Value=blockPrefab[i][j].Value+blockPrefab[i][j-1].Value
                        blockPrefab[i][j].Value=0
                        blockPrefab[i][j-1].Added=false //조합 비활성화
                        score+=100
                        fillScore(score)
                    }    
                }
            }
            fillStyle()
        }
    }
}

/* 상단이동 */
function move_Up(){
    for(let z=0;z<NbyN-1;z++){
        for(let i=1;i<NbyN;i++){
            for(let j=0;j<NbyN;j++){
                if(blockPrefab[i-1][j].Value==0){        //우측 공간이 비어있을 경우   
                    blockPrefab[i-1][j].Value=blockPrefab[i][j].Value
                    blockPrefab[i][j].Value=0
                } else{                     //우측 공간에 무엇인가 있을 경우
                    if(blockPrefab[i][j].Value==blockPrefab[i-1][j].Value){         //같은 값이 있을 경우
                        if(blockPrefab[i][j].Added&&blockPrefab[i-1][j].Added){     //조합했던 이력 확인
                            blockPrefab[i-1][j].Value=blockPrefab[i][j].Value+blockPrefab[i-1][j].Value
                            blockPrefab[i][j].Value=0
                            blockPrefab[i-1][j].Added=false //조합 비활성화
                            score+=100
                            fillScore(score)
                        }
                    }
                }
                fillStyle()
            }
        }
    }
    for(let i=0;i<NbyN;i++){
        for(let j=0;j<NbyN;j++){
            blockPrefab[i][j].Added=true
        }
    }
}

/* 하단이동 */
function move_Down(){
    for(let z=0;z<NbyN-1;z++){
        for(let i=NbyN-2;i>=0;i--){
            for(let j=NbyN-1;j>=0;j--){
                if(blockPrefab[i+1][j].Value==0){        //우측 공간이 비어있을 경우   
                    blockPrefab[i+1][j].Value=blockPrefab[i][j].Value
                    blockPrefab[i][j].Value=0
                } else{                     //우측 공간에 무엇인가 있을 경우
                    if(blockPrefab[i][j].Value==blockPrefab[i+1][j].Value){         //같은 값이 있을 경우
                        if(blockPrefab[i][j].Added&&blockPrefab[i+1][j].Added){     //조합했던 이력 확인
                            blockPrefab[i+1][j].Value=blockPrefab[i][j].Value+blockPrefab[i+1][j].Value
                            blockPrefab[i][j].Value=0
                            blockPrefab[i+1][j].Added=false //조합 비활성화
                            score+=100
                            fillScore(score)
                        }
                    }
                }
                fillStyle()
            }
        }
    }
    for(let i=0;i<NbyN;i++){
        for(let j=0;j<NbyN;j++){
            blockPrefab[i][j].Added=true
        }
    }
}

//#region Vector계산용 
function calculate_Vector(A,B){
    let tmp_vector=new Grid(0,0)
    tmp_vector.X=(B.X-A.X)/15
    tmp_vector.Y=(B.Y-A.Y)/15
    return tmp_vector
}

//#endregion