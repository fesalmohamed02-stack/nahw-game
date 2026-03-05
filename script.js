let playerName=""
let score=0
let current=0

let sentences=[

{sentence:"كان الطالب مجتهداً",word:"مجتهداً",answer:"خبر كان منصوب"},
{sentence:"إن العلم نور",word:"العلم",answer:"اسم إن منصوب"},
{sentence:"نجح الطالب المجتهد",word:"المجتهد",answer:"نعت مرفوع"},
{sentence:"رأيت الطالب نشيطاً",word:"نشيطاً",answer:"حال منصوب"},
{sentence:"ازداد الطالب علماً",word:"علماً",answer:"تمييز منصوب"}

]

function startGame(){

playerName=document.getElementById("player").value

loadSentence()

loadLeaderboard()

}

function loadSentence(){

let s=sentences[current]

let text=s.sentence.replace(
s.word,
"<u>"+s.word+"</u>"
)

document.getElementById("sentence").innerHTML=text

}

function checkAnswer(){

let user=document.getElementById("answer").value

if(user.includes(sentences[current].answer)){

alert("أنا كأبو فيصل فخور بيك 👏")

score++

}else{

alert("حاول تاني وركز شوية")

}

current++

if(current<sentences.length){

loadSentence()

}else{

saveScore()

document.getElementById("sentence").innerHTML=
"انتهى الاختبار - نتيجتك "+score

}

document.getElementById("answer").value=""

}

function saveScore(){

let data=JSON.parse(localStorage.getItem("scores"))||[]

data.push({
name:playerName,
score:score
})

data.sort((a,b)=>b.score-a.score)

localStorage.setItem("scores",JSON.stringify(data))

loadLeaderboard()

}

function loadLeaderboard(){

let data=JSON.parse(localStorage.getItem("scores"))||[]

let html=""

for(let i=0;i<data.length;i++){

html+=data[i].name+" : "+data[i].score+"<br>"

}

document.getElementById("leaderboard").innerHTML=html

}

let time=240

setInterval(function(){

time--

let m=Math.floor(time/60)
let s=time%60

document.getElementById("timer").innerHTML=m+":"+s

},1000)
