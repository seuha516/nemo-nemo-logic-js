var 가로칸수
var 세로칸수

var 줄들=[]
var 칸들=[]

var 줄들2=[]
var 칸들2=[]
var 테이블2

var 테이블

var 왼쪽리스트
var 위쪽리스트
var 왼쪽인풋
var 위쪽인풋

var 왼쪽임시
var 위쪽임시
var 왼쪽
var 위쪽

var k
var 총검정수
var 완료

function 알파고레벨투(){
    console.log('; ^;')
}

function 알파고(){
    총검정수=0
    for(var i=0;i<세로칸수;i++){
        var 그줄총합=0
        for(var y=0;y<왼쪽[i].length;y++){
            그줄총합+=왼쪽[i][y]
        }
        총검정수+=그줄총합
    }
    var aa=0;
    var bb=0;
    for(var i=0;i<세로칸수;i++){
        for(var j=0;j<왼쪽[i].length;j++){
            aa+=왼쪽[i][j]
        }
    }
    for(var i=0;i<가로칸수;i++){
        for(var j=0;j<위쪽[i].length;j++){
            bb+=위쪽[i][j]
        }
    }
    if(aa!==bb){
        alert('불가능한 로직입니다. (가로와 세로의 합이 다름)')
        return 0;
    }
    var a=1000
    while(a--){
        위쪽반영()
        왼쪽반영()
        if(점검()){
            break
        }
    }
    if(점검()==0){
        알파고레벨투()
    }
}

function 점검(){    
    var 지금검정수=0
    for(var i=0;i<세로칸수;i++){
        for(var j=0;j<가로칸수;j++){
            if(k[i][j]==1){
                지금검정수++
                칸들[i+1][j+1].style.background='black'
            }else if(k[i][j]==0){
                칸들[i+1][j+1].style.background='white'
            }else{
                칸들[i+1][j+1].style.background='#f0d7ff'
            }
        } 
    }
    if(총검정수==지금검정수&&완료==0){
        console.log('실행 종료')
        완료=1
    }
    return (총검정수==지금검정수)
}

function 왼쪽반영(){
    for(var i=0;i<세로칸수;i++){
        var 업뎃배열=자리배치(왼쪽[i],k[i],가로칸수)
        for(var j=0;j<가로칸수;j++){
            if(k[i][j]==1||k[i][j]==0){
                continue
            }else{
                k[i][j]=업뎃배열[j]
            }
        }
    }
    점검()
}
function 위쪽반영(){
    for(var i=0;i<가로칸수;i++){
        var 업뎃배열=자리배치(위쪽[i],세로뽑기(i),세로칸수)
        for(var j=0;j<세로칸수;j++){
            if(k[j][i]==1||k[j][i]==0){
                continue
            }else{
                k[j][i]=업뎃배열[j]
            }
        }
    }
    점검()
}
function 세로뽑기(i){
    var 세로배열=[]
    for(var j=0;j<세로칸수;j++){
        세로배열.push(k[j][i])
    }
    return 세로배열
}

function 모순인가(a,b){
    if(a+b==1&&a*b==0){return 1}
    else{return 0}
}
function 배열이모순인가(arra,arrb){  //이때 두 배열의 길이는 같다.
    for(var i=0;i<arra.length;i++){
        if(모순인가(arra[i],arrb[i])){return 1}
    }
    return 0
}
function 배열갱신(arra,arrb){ //이때 두 배열의 길이는 같다.
    var returnarr=[]
    for(var i=0;i<arra.length;i++){
        if(arra[i]==1&&arrb[i]==1){
            returnarr.push(1)
        }else if(arra[i]==0&&arrb[i]==0){
            returnarr.push(0)
        }else{
            returnarr.push(-3)
        }     
    }
    return returnarr
}
function 반복(arr,target,n){ //배열 arr에 target을 n번 넣기
    while(n--){
        arr.push(target)
    }
}

function 자리배치(개수배열,비교배열,범위){
    if(개수배열.length==1){
        var uploadarr=[]
        반복(uploadarr,0,범위)  //uploadarr은 지금 0,0,0,0,...이다        
        var 통과한temparr개수=0
        for(var i=0;i<범위-개수배열[0]+1;i++){
            var temparr=[]
            반복(temparr,0,i); 반복(temparr,1,개수배열[0]); 반복(temparr,0,범위-개수배열[0]-i)
            //console.log('완성된 temparr',temparr)
            if(배열이모순인가(temparr,비교배열)){
                //console.log('모순 => ',temparr)
                continue
            }
            else{
                //console.log('통과 => ',temparr)
                통과한temparr개수++
                //여기에 도착한 temparr은 경우의 수중 하나가 된다.
                if(통과한temparr개수==1){
                    uploadarr=temparr
                }else{
                    uploadarr=배열갱신(uploadarr,temparr)
                }
            }
        }
        //console.log('uploadarr:',uploadarr)
        if(통과한temparr개수==0){
            return -1
        }
        return uploadarr
    }else{
        var uploadarr=[]
        반복(uploadarr,0,범위)  //uploadarr은 지금 0,0,0,0,...이다
        var 통과한temparr개수=0
        //개수배열 첫항 빼고 나머지를 최대한 압축하면?
        var 임시합=0
        for(var i=1;i<개수배열.length;i++){
            임시합+=개수배열[i]+1
        }
        for(var i=0;i<(범위-임시합)-개수배열[0]+1;i++){
            var temparr=[]
            반복(temparr,0,i); 반복(temparr,1,개수배열[0]); 반복(temparr,0,1);
            //console.log(i+1,'번째 완성된 temparr',temparr) //temparr은 개수배열[0]+i+1자리이다
            //console.log('zzzzzzz',비교배열.slice(0,개수배열[0]+i))
            if(배열이모순인가(temparr,비교배열.slice(0,개수배열[0]+i+1))){
                //console.log('모순 => ',temparr)//앞자리부터 모순, 이런 케이스는 스킵
                continue
            }else{
                //console.log('1차 통과 => ',temparr)//일단 앞자리까지는 모순이 없음
                var 뒷자리배열=자리배치(개수배열.slice(1),비교배열.slice(개수배열[0]+i+1),범위-개수배열[0]-i-1)
                //console.log('그에 대한 뒷자리 배열',뒷자리배열)
                if(뒷자리배열==-1){
                    continue
                }
                temparr=temparr.concat(뒷자리배열)
                //console.log('ㄹㅇ 통과 => ',temparr)//완성본 통과
                통과한temparr개수++
                //여기에 도착한 temparr은 경우의 수중 하나가 된다.
                if(통과한temparr개수==1){
                    uploadarr=temparr
                }else{
                    uploadarr=배열갱신(uploadarr,temparr)
                }
            }
        }
        //console.log('uploadarr:',uploadarr)
        if(통과한temparr개수==0){
            return -1
        }
        return uploadarr
    }
}
function 제출클릭(){
    왼쪽임시=''
    위쪽임시=''
    완료=0
    왼쪽=[]
    위쪽=[]
    var i=document.getElementById('i')
    i.style.visibility='hidden'
    왼쪽리스트=왼쪽인풋.value
    위쪽리스트=위쪽인풋.value
    테이블2.style.visibility='hidden'
    var 입력확인창=document.getElementById('입력확인창')
    var a=String(가로칸수*21+21).concat('px')
    var b=String(세로칸수*21+21).concat('px')
    입력확인창.style.height=b
    입력확인창.style.width=a
    테이블.style.visibility='visible'
    var 제출=document.getElementById('제출')
    제출.style.visibility='hidden'
    var 수정=document.getElementById('수정')
    수정.style.visibility='visible'
    왼쪽임시=왼쪽리스트.split('\n')
    위쪽임시=위쪽리스트.split('\n')
    for(var i=0;i<세로칸수;i++){
        왼쪽.push([])
        if(왼쪽임시.length-1<i){
            왼쪽[i].push('0')
        }else{
            왼쪽[i]=왼쪽임시[i].split(' ')
            if(왼쪽[i].length==1&&왼쪽[i][0]==''){
                왼쪽[i][0]='0'
            }else if(왼쪽[i].length!=1&&왼쪽[i][왼쪽[i].length-1]==''){
                왼쪽[i].pop()
            }
        }        
    }
    for(var i=0;i<가로칸수;i++){
        위쪽.push([])
        if(위쪽임시.length-1<i){
            위쪽[i].push('0')
        }else{
            위쪽[i]=위쪽임시[i].split(' ')
            if(위쪽[i].length==1&&위쪽[i][0]==''){
                위쪽[i][0]='0'
            }else if(위쪽[i].length!=1&&위쪽[i][위쪽[i].length-1]==''){
                위쪽[i].pop()
            }    
        }        
    }
    for(var i=0;i<왼쪽.length;i++){
        for(var j=0;j<왼쪽[i].length;j++){
            왼쪽[i][j]=Number(왼쪽[i][j])
        }
    }
    for(var i=0;i<위쪽.length;i++){
        for(var j=0;j<위쪽[i].length;j++){
            위쪽[i][j]=Number(위쪽[i][j])
        }
    }
    // console.log(왼쪽)
    // console.log(위쪽)
    for(var i=1;i<=세로칸수;i++){
        for(var j=1;j<=가로칸수;j++){
            칸들[i][j].style.background='gray'
        } 
    }
    k=[]
    for(var i=0;i<세로칸수;i++){
        k.push([])
        for(var j=0;j<가로칸수;j++){
            k[i].push(-3)
        } 
    }
    알파고()
}
function 수정클릭(){
    총검정수=0
    왼쪽리스트=''
    위쪽리스트=''
    var i=document.getElementById('i')
    i.style.visibility='visible'
    테이블2.style.visibility='visible'
    var 입력확인창=document.getElementById('입력확인창')
    var bb=String(긴칸*26+26).concat('px')
    입력확인창.style.height=bb
    입력확인창.style.width='600px'
    테이블.style.visibility='hidden'
    var 제출=document.getElementById('제출')
    제출.style.visibility='visible'
    var 수정=document.getElementById('수정')
    수정.style.visibility='hidden'
}

var 긴칸
var 짧은칸

function send1(){
    var message = document.getElementById('test1').value
    document.getElementById('test1').value = ''    
    가로칸수=Number(message)
    if(isNaN(가로칸수)){
        //console.log('올바르지 않음')
        return 0
    }
    if(가로칸수>50||가로칸수<=0){
        //console.log('올바르지 않음')
        return 0
    }
    var 부제=document.getElementById('부제')
    var 새로운부제='가로 '.concat(String(가로칸수),'줄')  
    부제.textContent=새로운부제
    var 가로가로=document.getElementById('가로가로')
    가로가로.style.visibility='hidden'
    var 세로세로=document.getElementById('세로세로')
    세로세로.style.visibility='visible'
    var 다음입력창=document.getElementById('test2')
    다음입력창.focus()
}
function send2(){
    var message = document.getElementById('test2').value
    document.getElementById('test2').value = ''    
    세로칸수=Number(message)
    if(isNaN(세로칸수)){
        console.log('올바르지 않음')
        return 0
    }
    if(세로칸수>50||세로칸수<=0){
        console.log('올바르지 않음')
        return 0
    }
    var i=document.getElementById('i')
    i.style.visibility='visible'
    var 부제=document.getElementById('부제')
    var 새로운부제=String(가로칸수).concat('x',String(세로칸수))
    부제.textContent=새로운부제
    테이블=document.createElement('table')
    테이블.className='표'
    테이블.style.visibility='hidden'
    for (var i=0;i<=세로칸수;i++){
        var 줄=document.createElement('tr')
        줄들.push(줄)
        칸들.push([])
        for(var j=0;j<=가로칸수;j++){
            var 칸=document.createElement('td')
            칸.className='칸'
            칸.style.width='19.75px'
            칸.style.height='20.75px'
            칸들[i].push(칸)
            줄.appendChild(칸)
        }     
        테이블.appendChild(줄)  
    }
    for(var i=1;i<=가로칸수;i++){
        var 그칸=칸들[0][i]
        그칸.textContent=String(i)
        그칸.style.background='lightgray'
    }
    for(var i=1;i<=세로칸수;i++){
        var 그칸=칸들[i][0]
        그칸.textContent=String(i)
        그칸.style.background='lightgray'
    }
    var 가로가로=document.getElementById('가로가로')
    가로가로.style.visibility='hidden'
    var 세로세로=document.getElementById('세로세로')
    세로세로.style.visibility='hidden'
    var 초기화=document.getElementById('초기화')
    초기화.style.visibility='visible'
    테이블2=document.createElement('table')
    테이블2.className='표2'
    if(가로칸수>=세로칸수){긴칸=가로칸수}else{긴칸=세로칸수}
    if(가로칸수>=세로칸수){짧은칸=세로칸수}else{짧은칸=가로칸수}
    var 입력확인창=document.getElementById('입력확인창')
    var bb=String(긴칸*26+26).concat('px')
    입력확인창.style.height=bb
    입력확인창.style.width='600px'
    입력확인창.style.visibility='visible'
    for (var i=0;i<=긴칸;i++){
        var 줄=document.createElement('tr')
        줄들2.push(줄)
        칸들2.push([])
        var kk
        if(i<2){kk=3}
        else if(i<=짧은칸+1){kk=1}
        else {kk=0}
        for(var j=0;j<=kk;j++){
            var 칸=document.createElement('td')
            칸.className='칸2'
            if(kk==3){
                if(j%2==0){
                    칸.style.width='50px'
                    if(i>0){칸.textContent=String(i)}
                    칸.style.background='lightgray'
                }else{
                    칸.style.width='250px'
                }
            }else{
                칸.style.width='50px'
                if(i>0){칸.textContent=String(i)}
                
                칸.style.background='lightgray'
            }
            칸.style.height='25.75px'
            칸들2[i].push(칸)
            줄.appendChild(칸)              
        }   
        테이블2.appendChild(줄)  
    }
    입력확인창.appendChild(테이블2)
    칸들2[1][1].rowSpan=String(세로칸수)
    칸들2[1][3].rowSpan=String(가로칸수)
    if(긴칸!=짧은칸){
        if(세로칸수<가로칸수){
            칸들2[짧은칸+1][0].rowSpan=String(긴칸-짧은칸)
            칸들2[짧은칸+1][0].colSpan='2'
            칸들2[짧은칸+1][0].style.background='#8e8e8e'
            칸들2[짧은칸+1][0].textContent=''
        }else{
            칸들2[짧은칸+1][1].rowSpan=String(긴칸-짧은칸)
            칸들2[짧은칸+1][1].colSpan='2'
            칸들2[짧은칸+1][1].style.background='#8e8e8e'
            칸들2[짧은칸+1][1].textContent=''
        }
    }
    for(var i=0;i<=3;i++){
        var 그칸=칸들2[0][i]
        if(i==1){
            그칸.textContent='로직 왼쪽의 숫자'
            칸들2[0][i].fontweight='bold'
        }else if(i==3){
            그칸.textContent='로직 위쪽의 숫자'
            칸들2[0][i].fontweight='bold'
        }     
        그칸.style.background='#ddecff'
    }
    칸들2[0][0].style.background='lightgray'
    칸들2[0][2].style.background='lightgray'
    칸들[0][0].style.background='lightgray'
    왼쪽인풋=document.createElement('textarea')
    칸들2[1][1].appendChild(왼쪽인풋)
    왼쪽인풋.type='text'
    왼쪽인풋.className='인풋'
    왼쪽인풋.style.height=String(세로칸수*27-2).concat('px')
    왼쪽인풋.placeholder='숫자를 입력하세요.'
    위쪽인풋=document.createElement('textarea')
    칸들2[1][3].appendChild(위쪽인풋)
    위쪽인풋.type='text'
    위쪽인풋.className='인풋'
    위쪽인풋.style.height=String(가로칸수*27-2).concat('px')
    위쪽인풋.placeholder='띄어쓰기와 엔터로 구분합니다.'
    왼쪽인풋.focus()
    var 제출=document.getElementById('제출')
    제출.style.visibility='visible'
    var 수정=document.getElementById('수정')
    수정.style.visibility='hidden'
    입력확인창.appendChild(테이블)
}
function 초기화(){
    완료=0
    var i=document.getElementById('i')
    i.style.visibility='hidden'
    var 가로가로=document.getElementById('가로가로')
    가로가로.style.visibility='visible'
    var 세로세로=document.getElementById('세로세로')
    세로세로.style.visibility='hidden'
    var 초기화=document.getElementById('초기화')
    초기화.style.visibility='hidden'
    var 제출=document.getElementById('제출')
    제출.style.visibility='hidden'
    var 수정=document.getElementById('수정')
    수정.style.visibility='hidden'
    var 부제=document.getElementById('부제')
    부제.textContent=''
    document.getElementById('test1').value = ''
    document.getElementById('test2').value = ''
    var 입력확인창=document.getElementById('입력확인창')
    while(입력확인창.hasChildNodes()){
        입력확인창.removeChild(입력확인창.firstChild)
    }
    입력확인창.style.height='400px'
    입력확인창.style.width='400px'
    입력확인창.style.visibility='hidden'
    줄들=[]
    칸들=[]
    줄들2=[]
    칸들2=[]
    왼쪽리스트=''
    위쪽리스트=''
}