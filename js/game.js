// 題目
const questions = [
  {
    id: 1,
    title: "Q1. 柱子損害及破損，該如何補強？",
    hint: "增加防震柱補強建築穩定度！",
    img: "img/game/window.png",
  },
  {
    id: 2,
    title: "Q2. 牆面毀損，該如何修復？",
    hint: "使用剪力牆，增加牆面品質",
    img: "img/game/door.png",
  },
];

const gameBtn = document.getElementById("gamebtn");
const blackbg = document.getElementById("blackbg");
const building = document.getElementById("building");
const timer = document.getElementById("timer");
const timerNumber = document.getElementById("timer_number");
const questionContainer = document.getElementById("questionContainer");
const titleContainer = document.getElementById("titleContainer");
const hintContainer = document.getElementById("hintContainer");
const questionDragableContainer = document.getElementById("questionDragableContainer");
const questionImgContainer = document.getElementById("questionImgContainer");
const questionImgs = document.querySelectorAll(".question_img");
const spaceImgs = document.querySelectorAll(".space_img");
const gamerules = document.getElementById("gamerules");
const success = document.getElementById("success");
const vido = document.getElementById("vido");
const fillBtn = document.getElementById("fillBtn");
const form =  document.getElementById("form");
const userInfoForm = document.getElementById("userInfoForm");
const formBtn = document.getElementById("formBtn");
const formSend = document.getElementById("formSend");
const formSendBtn = document.getElementById("formSendBtn");
let time = null;

// 繪製題目
const renderQuestion = function ({ id, title, hint, img }) {
  titleContainer.innerText = title;
  hintContainer.innerText = hint;
  questionDragableContainer.dataset.answer = id;
  questionImgContainer.src = img;
};

// 遊戲開始按鈕
gameBtn.addEventListener("click", () => {
  document.getElementById("gamebg").style.backgroundImage = "url('img/game/game_bg.png')";
  blackbg.style.display = "none";
  building.style.display = "block";
  timer.style.display = "block";
  questionContainer.style.display = "block";
  spaceImgs.forEach((spaceImg) => {
    spaceImg.innerHTML = "";
    spaceImg.style.border = "6px solid #ffffff";
  });
  renderQuestion(questions[0]);

// 計時器
  let count = 30;
  timerNumber.innerText = count;
  time = setInterval(function () {
    if (count > 0) {
      count = count - 1;
      timerNumber.innerText = count;
    } else if (count === 0){
      clearInterval(time);
      document.getElementById("gamebg").style.backgroundImage = "url('img/game/start.png')";
      blackbg.style.display = "block";
      building.style.display = "none";
      timer.style.display = "none";
      questionContainer.style.display = "none";
    } 
    else {
      clearInterval(time);
    }
  }, 1000);
});

// 拖曳開始
const handleDragStart = function (e) {
  this.classList.add("dragging");
  questionAnswer = this.dataset.answer;
  hintContainer.style.opacity = "1";
  hintContainer.style.visibility = "visible";

  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
};

// 拖曳結束
const handleDragEnd = function (e) {
  this.classList.remove("dragging");
  hintContainer.style.opacity = "0";
  hintContainer.style.visibility = "hidden";
};

// 經過目標 (allowDrop)
const handleDragOver = function (e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  return false;
};

// 放進目標
const handleDrop = function (e) {
  e.stopPropagation();
  spaceAnswer = this.dataset.answer;

  if (questionAnswer === spaceAnswer) {
    this.style.border = "none";
    this.innerHTML = e.dataTransfer.getData("text/html");
    questionAnswer < questions.length
      ? renderQuestion(questions[questionAnswer])
      : gameEnd()
  }
  return false;
};

// 綁定拖放事件
questionImgs.forEach((questionImg) => {
  questionImg.addEventListener("dragstart", handleDragStart);
  questionImg.addEventListener("dragend", handleDragEnd);
});

spaceImgs.forEach((spaceImg) => {
  spaceImg.addEventListener("dragover", handleDragOver);
  spaceImg.addEventListener("drop", handleDrop);
});

// 遊戲結束
function gameEnd() {
  document.getElementById("gamebg").style.backgroundImage = "url('img/game/end.png')";
  blackbg.style.display = "block";
  building.style.display = "none";
  questionContainer.style.display = "none";
  timer.style.background = "rgba(0, 0, 0, 0.4)";
  gamerules.style.display = "none";
  success.style.display = "block";
  vido.style.display = "block";
  clearInterval(time);
}

// 觀看完影片後切換按鈕
// 載入youtube影片
 var player;
 function onYouTubePlayerAPIReady() {
     player = new YT.Player('player', {
       height: '262',
       width: '463',
       videoId: 'x4c1t-vhKXA',
       events: {
         'onStateChange': onPlayerStateChange
       }
     });
 }

// 播放影片
 function onPlayerReady(event) {
   player.playVideo();
 }

// 影片播放結束
 function onPlayerStateChange(event) {        
     if(event.data === 0) {            
        fillBtn.innerHTML = "<img src='./img/game/fill_video_btn.png'>";
        fillBtn.removeAttribute("disable");
        fillBtn.addEventListener("click", () => {
          vido.style.display = "none";
          form.style.display = "block";
        });
     }
 }

// 填寫完表單
userInfoForm.addEventListener('submit',function(e){
  e.preventDefault();
  form.style.display = "none";
  formSend.style.display = "block";
})

// 表單完成確認
formSendBtn.addEventListener("click", () => {
  formSend.style.display = "none";
  window.location.reload();
})