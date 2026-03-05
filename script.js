let playerName=""
let score=0
let current=0

let sentences=[
{sentence:"كان الطالب مجتهداً",word:"مجتهداً",answer:"خبر كان منصوب"},
{sentence:"أصبح الجو معتدلاً",word:"معتدلاً",answer:"خبر أصبح منصوب"},
{sentence:"إن العلم نور",word:"العلم",answer:"اسم إن منصوب"},
{sentence:"إن الصدق فضيلة",word:"الصدق",answer:"اسم إن منصوب"},
{sentence:"نجح الطالب المجتهد",word:"المجتهد",answer:"نعت مرفوع"},
{sentence:"رأيت الطالب نشيطاً",word:"نشيطاً",answer:"حال منصوب"},
{sentence:"ازداد الطالب علماً",word:"علماً",answer:"تمييز منصوب"},
{sentence:"جاء صديقك خالد",word:"خالد",answer:"بدل مرفوع"},
{sentence:"ركض الطفل ركضاً سريعاً",word:"ركضاً",answer:"مفعول مطلق"},
{sentence:"جلس الطالب أمام المعلم",word:"أمام",answer:"ظرف مكان"},
{sentence:"قرأ محمد الكتاب",word:"الكتاب",answer:"مفعول به منصوب"},
{sentence:"حضر المعلم مبكراً",word:"مبكراً",answer:"حال منصوب"},
{sentence:"العلم مفيد",word:"مفيد",answer:"خبر مرفوع"},
{sentence:"الطالب نشيط",word:"الطالب",answer:"مبتدأ مرفوع"},
{sentence:"كان الجو بارداً",word:"بارداً",answer:"خبر كان منصوب"},
{sentence:"صار الليل هادئاً",word:"هادئاً",answer:"خبر صار منصوب"},
{sentence:"ليس الكذب محموداً",word:"محموداً",answer:"خبر ليس منصوب"},
{sentence:"ظل الطالب يذاكر",word:"الطالب",answer:"اسم ظل مرفوع"},
{sentence:"مازال المطر غزيراً",word:"غزيراً",answer:"خبر مازال منصوب"},
{sentence:"بات الطفل سعيداً",word:"سعيداً",answer:"خبر بات منصوب"},
{sentence:"إن النجاح قريب",word:"النجاح",answer:"اسم إن منصوب"},
{sentence:"إن الطالب مجتهد",word:"مجتهد",answer:"خبر إن مرفوع"},
{sentence:"رأيت طائراً جميلاً",word:"جميلاً",answer:"نعت منصوب"},
{sentence:"اشتريت كتاباً جديداً",word:"جديداً",answer:"نعت منصوب"},
{sentence:"جاء الرجل مسرعاً",word:"مسرعاً",answer:"حال منصوب"},
{sentence:"جلس الطفل باكياً",word:"باكياً",answer:"حال منصوب"},
{sentence:"امتلأ الكوب ماءً",word:"ماءً",answer:"تمييز منصوب"},
{sentence:"اشتعل الرأس شيباً",word:"شيباً",answer:"تمييز منصوب"},
{sentence:"ضربت اللص ضرباً شديداً",word:"ضرباً",answer:"مفعول مطلق"},
{sentence:"سافرت سفراً طويلاً",word:"سفراً",answer:"مفعول مطلق"},
{sentence:"وقفت أمام المدرسة",word:"أمام",answer:"ظرف مكان"},
{sentence:"جلست تحت الشجرة",word:"تحت",answer:"ظرف مكان"},
{sentence:"سافرت صباحاً",word:"صباحاً",answer:"ظرف زمان"},
{sentence:"عدت مساءً",word:"مساءً",answer:"ظرف زمان"},
{sentence:"نجح الطالبان المجتهدان",word:"المجتهدان",answer:"نعت مرفوع"},
{sentence:"قرأ التلميذ الدرس",word:"الدرس",answer:"مفعول به"},
{sentence:"أحب الوطن حباً صادقاً",word:"حباً",answer:"مفعول مطلق"},
{sentence:"عاد المسافر سالماً",word:"سالماً",answer:"حال"},
{sentence:"العلم نور يهدي الناس",word:"نور",answer:"خبر"},
{sentence:"الصدق منجاة",word:"الصدق",answer:"مبتدأ"},
{sentence:"كان البحر هادئاً",word:"هادئاً",answer:"خبر كان"},
{sentence:"إن المطر نافع",word:"المطر",answer:"اسم إن"}
]

function startGame(){
playerName=document.getElementById("player").value
if(playerName==""){alert("اكتب اسمك أولاً");return;}
document.querySelector(".start-box").style.display="none"
document.querySelector(".game-box").style.display="block"
loadSentence()
loadLeaderboard()
}

function loadSentence(){
let s=sentences[current]
let text=s.sentence.replace(s.word,"<u>"+s.word+"</u>")
document.getElementById("sentence").innerHTML=text
document.getElementById("full").innerHTML=""
}

function checkAnswer(){
let user=document.getElementById("answer").value
if(user.includes(sentences[current].answer)){
alert("أنا كأبو فيصل فخور بيك 👏")
score++
}else{
alert("حاول تاني وركز شوية 🙂")
}
current++
if(current<sentences.length){
loadSentence()
}else{
saveScore()
document.getElementById("sentence").innerHTML="انتهى الاختبار - نتيجتك "+score
document.getElementById("answer").style.display="none"
}
document.getElementById("answer").value=""
}

function showFull(){
let full=sentences[current].full||[sentences[current].answer]
document.getElementById("full").innerHTML=full.join("<br>")
}

function saveScore(){
let data=JSON.parse(localStorage.getItem("scores"))||[]
data.push({name:playerName,score:score})
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
if(document.querySelector(".game-box").style.display=="block"){
time--
let m=Math.floor(time/60)
let s=time%60
document.getElementById("timer").innerHTML=m+":"+(s<10?"0"+s:s)
if(time<=0){alert("انتهى الوقت")}
}
},1000)
