let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
let turnIndicator = document.getElementById("current-player");
let player1ScoreDisplay = document.getElementById("player1-score");
let player2ScoreDisplay = document.getElementById("player2-score");
let player1Name = localStorage.getItem("player1Name");
let player2Name = localStorage.getItem("player2Name");
let player1Score = 0, player2Score = 0;
let lastWinner = "X";

let winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let xTurn = true;
let count = 0;

const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  popupRef.classList.remove("hide");
};

const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  popupRef.classList.add("hide");
  setTurnIndicator();
};

const setTurnIndicator = () => {
  if (lastWinner === "X") {
    xTurn = true;
    turnIndicator.innerText = player1Name;
  } else {
    xTurn = false;
    turnIndicator.innerText = player2Name;
  }
};

const winFunction = (letter) => {
    disableButtons();
    lastWinner = letter;

    const winSound = document.getElementById("win-sound");
    if (winSound) {
        winSound.currentTime = 0;
        winSound.play().catch(e => console.log("Sound play blocked", e));
    }

    if (letter === "X") {
        player1Score++;
        msgRef.innerHTML = `&#x1F389; <br> '${player1Name}' Wins! <br> Skor: ${player1Name}: ${player1Score} - ${player2Name}: ${player2Score}`;
        msgRef.classList.add('winner');
    } else {
        player2Score++;
        msgRef.innerHTML = `&#x1F389; <br> '${player2Name}' Wins! <br> Skor: ${player1Name}: ${player1Score} - ${player2Name}: ${player2Score}`;
        msgRef.classList.add('winner');
    }
    updateScore();
};



const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = `&#x1F60E; <br> It's a Draw! <br> Skor: ${player1Name}: ${player1Score} - ${player2Name}: ${player2Score}`;
  msgRef.classList.add('draw');

  const drawSound = document.getElementById("draw-sound");
  if (drawSoundSound) {
      drawSound.currentTime = 0;
      drawSoundSound.play().catch(e => console.log("Sound play blocked", e));
  }

};

const updateScore = () => {
  player1ScoreDisplay.innerText = player1Score;
  player2ScoreDisplay.innerText = player2Score;
};

newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
  updateScore();
});

restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
  player1Score = 0;
  player2Score = 0;
  lastWinner = "X";
  updateScore();
});

const winChecker = () => {
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    if (element1 !== "" && element1 === element2 && element1 === element3) {
      winFunction(element1);
      return;
    }
  }
};



btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      element.innerText = "X";
      turnIndicator.innerText = player2Name;
    } else {
      xTurn = true;
      element.innerText = "O";
      turnIndicator.innerText = player1Name;
    }
    element.disabled = true;
    count += 1;
    if (count === 9) {
      drawFunction();
    }
    winChecker();
  });
});

window.onload = () => {
  enableButtons();
  setTurnIndicator();
};

document.getElementById("back-button").addEventListener("click", () => {
    const confirmQuit = confirm("Anda ingin meninggalkan match?");
    if (confirmQuit) {
        window.location.href = "index.html";
    }
});

const bgm = document.getElementById("bgm");

window.addEventListener("load", () => {
const musicSetting = localStorage.getItem("musicOn");

if (musicSetting === null || musicSetting === "true") {
    bgm.muted = false;
    bgm.volume = 0.2;
    bgm.play().catch((e) => console.log("Autoplay blocked", e));
} else {
    bgm.pause();
}
});
