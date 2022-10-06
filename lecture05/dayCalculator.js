window.onload = function() {    
    let today = new Date(); 

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  //월
    let date = today.getDate();  // 날짜
    let daycode;    //요일을 수로 사용하기 위해 만든 변수[해당 년도->월의 첫 날 순으로 요일을 정함]
                    // 일-월-화-수-목-금-토 => 0-1-2-3-4-5-6 7로 나눈 나머지 값을 기준으로 만듬

    x=Math.floor((year%400)/100)
    y=(year%400)%100
    console.log(x,y);

    daycode=findDayOfWeekYear(year)
    console.log("이번년도 1월 1일의 요일 : "+daycode)

    daycode=findDayOfWeekMonth(daycode, YearChecker(year), month)
    console.log("해당 월의 첫 요일은 : "+daycode)

    console.log("이번 달은 "+month+"월이며 "+
        CalculateMonthDays(month)+"일이 이 달의 마지막 날입니다.")

    console.log("이번 달의 행은 "+CountWeeks( daycode, CalculateMonthDays(month) )+"만큼 필요합니다.")

    var weeks = document.getElementsByClassName("Weeks");
    let page = document.getElementById("Page");
    console.log(page)
    for(let i=0;i<CountWeeks( daycode, CalculateMonthDays(month))-1;i++){
        page.appendChild(weeks[i].cloneNode(true));
    }
    FillDaysCalendar(daycode, CalculateMonthDays(month))
}

function findDayOfWeekYear(year){ //해당 년도의 1월1일 요일 구하기
    let x=Math.floor((year%400)/100)
    let y=(year%400)%100
    let z=Math.floor(y/4)
    let f=y%4
    let result

    if(x>0){ //100년 이상부터
        daycode = 5-2(x-1)
        if(f>0){
            result = z+y+daycode
        }
        else{
            z=z-1
            if(z<0){ z=0 }
            result = z+y+daycode
        }
    }
    else{   //100년 미만
        daycode = 6
        if(f>0){
            result=1+z+y+daycode
        }
        else{
            result=z+y+daycode
        }
    }
    daycode=result%7
    return daycode;
}

function findDayOfWeekMonth(daycode, yearcheck, month){ //yearcheck는 평년과 윤년기준으로 평년true, 윤년false
    let mon=month-1
    let mon_quetient=Math.floor(mon/7)
    let mon_mod=mon%7
    let t, result

    if(mon_quetient>0 && mon_mod>0){  //1~12월에서 8월이상
        result=61*Math.floor(mon_mod/2)+30*(mon_mod%2)
        if(yearcheck){ result=212+result }
        else{ result=213+result }
    }
    else{                       //1~12월에서 7월이하
        result=61*Math.floor(mon_mod/2)+30*(mon_mod%2)
        if(mon_mod>=2){ t=-1 }
        else { t=0 }
        if(yearcheck){ result=result+2*t }
        else{ result = result+1*t }
    }
    return (daycode+result)%7
}
function YearChecker(year){ //해당 년도 평년인지 확인하기
    let check = true
    if((year%4)==0){
        check = false
        if((year%100)==0){ check = true }
    }

    console.log("디버그 테스트 평년인가?"+check)

    return check
}
function CalculateMonthDays(month){
    let mon_quetient = Math.floor(month/7)
    let mon_mod = month%7
    let allday

    if(mon_mod%2 == 1){
        allday = 31
    }
    else{
        allday = 30
        if(mon_quetient==1 && mon_mod==0) { allday=31 }
    }
    return allday
}
function CountWeeks(daycode, monthday){
    return Math.ceil( (daycode+monthday-1)/7 )
}
function FillDaysCalendar(daycode, monthday){
    var Sun = document.getElementsByClassName("Sun")
    var Mon = document.getElementsByClassName("Mon")
    var Tue = document.getElementsByClassName("Tue")
    var Wed = document.getElementsByClassName("Wed")
    var Thu = document.getElementsByClassName("Thu")
    var Fri = document.getElementsByClassName("Fri")
    var Sat = document.getElementsByClassName("Sat")
    
    for(let i=1;i<=monthday;i++){
        switch((i+daycode-1)%7){
            case 0:
                Sun[Math.floor((i+daycode-1)/7)].innerHTML = Sun[Math.floor((i+daycode-1)/7)].innerHTML+"&nbsp&nbsp&nbsp"+i.toString()
                break
            case 1:
                Mon[Math.floor((i+daycode-1)/7)].innerHTML = Mon[Math.floor((i+daycode-1)/7)].innerHTML+"&nbsp&nbsp&nbsp"+i.toString()
                break
            case 2:
                Tue[Math.floor((i+daycode-1)/7)].innerHTML = Tue[Math.floor((i+daycode-1)/7)].innerHTML+"&nbsp&nbsp&nbsp"+i.toString()
                break
            case 3:
                Wed[Math.floor((i+daycode-1)/7)].innerHTML = Wed[Math.floor((i+daycode-1)/7)].innerHTML+"&nbsp&nbsp&nbsp"+i.toString()
                break
            case 4:
                Thu[Math.floor((i+daycode-1)/7)].innerHTML = Thu[Math.floor((i+daycode-1)/7)].innerHTML+"&nbsp&nbsp&nbsp"+i.toString()
                break
            case 5:
                Fri[Math.floor((i+daycode-1)/7)].innerHTML = Fri[Math.floor((i+daycode-1)/7)].innerHTML+"&nbsp&nbsp&nbsp"+i.toString()
                break
            case 6:
                Sat[Math.floor((i+daycode-1)/7)].innerHTML = Sat[Math.floor((i+daycode-1)/7)].innerHTML+"&nbsp&nbsp&nbsp"+i.toString()
                break
        }
    }
}
