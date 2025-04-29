let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
let turnIndicator = document.getElementById("current-player"); // Ambil elemen indikator giliran
let player1ScoreDisplay = document.getElementById("player1-score"); // Ambil elemen skor pemain 1
let player2ScoreDisplay = document.getElementById("player2-score"); // Ambil elemen skor pemain 2
let player1Name = localStorage.getItem("player1Name");
let player2Name = localStorage.getItem("player2Name");
let player1Score = 0, player2Score = 0;
let winningPattern = [
  [0, 1, 2], // Baris pertama
  [3, 4, 5], // Baris kedua
  [6, 7, 8], // Baris ketiga
  [0, 3, 6], // Kolom pertama
  [1, 4, 7], // Kolom kedua
  [2, 5, 8], // Kolom ketiga
  [0, 4, 8], // Diagonal dari kiri atas ke kanan bawah
  [2, 4, 6], // Diagonal dari kanan atas ke kiri bawah
];
let xTurn = true; // Menentukan giliran pemain
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
    resetTurnIndicator(); // Reset indikator giliran saat tombol di-enable
};

const resetTurnIndicator = () => {
    xTurn = true; // Set giliran pemain X
    turnIndicator.innerText = `${player1Name}`; // Tampilkan nama pemain 1 sebagai giliran pertama
};

const winFunction = (letter) => {
  disableButtons();
  if (letter === "X") {
      player1Score++;
      msgRef.innerHTML = `&#x1F389; <br> '${player1Name}' Wins! <br> Skor: ${player1Name}: ${player1Score} - ${player2Name}: ${player2Score}`;
      msgRef.classList.add('winner'); // Tambahkan kelas untuk pemenang
  } else {
      player2Score++;
      msgRef.innerHTML = `&#x1F389; <br> '${player2Name}' Wins! <br> Skor: ${player1Name}: ${player1Score} - ${player2Name}: ${player2Score}`;
      msgRef.classList.add('winner'); // Tambahkan kelas untuk pemenang
  }
  updateScore();
};

const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = `&#x1F60E; <br> It's a Draw! <br> Skor: ${player1Name}: ${player1Score} - ${player2Name}: ${player2Score}`;
  msgRef.classList.add('draw'); // Tambahkan kelas untuk seri
};

const updateScore = () => {
    player1ScoreDisplay.innerText = player1Score; // Update skor pemain 1
    player2ScoreDisplay.innerText = player2Score; // Update skor pemain 2
};

newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
    updateScore();
});

restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
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
            return; // Keluar dari fungsi setelah menemukan kemenangan
        }
    }
};

btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            element.innerText = "X";
            turnIndicator.innerText = `${player2Name}`; // Ubah indikator ke nama pemain 2
            element.disabled = true;
        } else {
            xTurn = true;
            element.innerText = "O";
            turnIndicator.innerText = `${player1Name}`; // Ubah indikator ke nama pemain 1
            element.disabled = true;
        }
        count += 1;
        if (count === 9) {
            drawFunction();
        }
        winChecker();
    });
});

window.onload = () => {
    enableButtons();
    resetTurnIndicator(); // Reset indikator giliran saat halaman dimuat
};