const startGameBtn = document.querySelector(".startGame");
const endGameBtn = document.querySelector(".endGame");
const countMoves = document.querySelector("#countMoves");
const timer = document.querySelector("#timer");

const gameContainer = document.querySelector(".game");
const gameWrapper = document.querySelector(".gameWrapper");
const resultContainer = document.querySelector(".resultContainer");
const movesResult = document.querySelector("#result span");
const restartGame = document.querySelector(".resultContainer .startGame");
let minutes = 0;
let seconds = 0;
let moves = 0;
let winMoves = 0;
let timerId;
let firstCardElement = null;
let secondCardElement = null;
let firstCardElementBack = null;
let secondCardElementBack = null;
let lockBoard = false;
let imgsArray = [
  { name: "badge", url: "./images/badge.png" },
  { name: "diamond", url: "./images/diamond.png" },
  { name: "nonagon", url: "./images/nonagon.png" },
  { name: "octagon", url: "./images/octagon.png" },
  { name: "spark1", url: "./images/spark1.png" },
  { name: "spark2", url: "./images/spark2.png" },
  { name: "sparkle", url: "./images/sparkle.png" },
  { name: "star", url: "./images/star.png" },
  { name: "triangle", url: "./images/triangle.png" },
  { name: "x", url: "./images/X.png" },
];
const drawGame = () => {
  let duplicated = [...imgsArray, ...imgsArray];
  duplicated.sort(() => Math.random() - 0.5);

  let draw = duplicated.map((card) => {
    return `<div class="card">
          <div class="front">?</div>
          <div class="back"><img src=${card.url} alt=${card.name}></div>
        </div>`;
  });
  gameContainer.innerHTML = draw.join("");
};
const startTimer = () => {
  seconds++;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
  let secondsvalue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timer.innerHTML = `${minutesValue} : ${secondsvalue}`;
};
const resetGameVariables = () => {
  clearInterval(timerId);
  lockBoard = false;
  seconds = 0;
  minutes = 0;
  timer.innerHTML = "00:00";
  moves = 0;
  winMoves = 0;
  countMoves.innerHTML = "0";
  firstCardElement = null;
  secondCardElement = null;
  firstCardElementBack = null;
  secondCardElementBack = null;
};

const startGame = () => {
  resetGameVariables();
  // draw game board
  drawGame();
  // unhide dom game and hide start game btn and result game
  gameWrapper.classList.remove("hide");
  startGameBtn.classList.add("hide");
  resultContainer.classList.add("hide");

  const cards = document.querySelectorAll(".card");
  // show cards shortly and hide them
  cards.forEach((card) => {
    card.classList.add("clicked");

    setTimeout(() => {
      card.classList.remove("clicked");
    }, 2000);
  });
  // start timer
  timerId = setInterval(() => {
    startTimer();
  }, 1000);
  // add click event listener to cards
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      handleCardClick(card);
    });
  });
};

const handleCardClick = (card) => {
  // if board is locked or card is clicked exit the func
  if (lockBoard) return;
  card.classList.add("clicked");
  // if the first card not clicked , make them clicked
  if (!firstCardElement) {
    firstCardElementBack = card.querySelector("img").getAttribute("alt");
    firstCardElement = card;
  } else if (!secondCardElement) {
    // else if the first card clicked , make the second clicked if not true
    moves++;
    countMoves.innerText = moves;
    lockBoard = true;

    secondCardElement = card;
    secondCardElementBack = card.querySelector("img").getAttribute("alt");
    // if both cards is matched
    if (firstCardElementBack === secondCardElementBack) {
      winMoves++;
      firstCardElement.classList.add("matched");
      secondCardElement.classList.add("matched");
      lockBoard = false;
      // win game if winMoves = the array length
      if (winMoves === imgsArray.length) {
        //clear timer and hide game board and show result dom
        clearInterval(timerId);
        gameWrapper.classList.add("hide");
        movesResult.innerText = moves;
        resultContainer.classList.remove("hide");
      }
    } else {
      // if not matched flip them back
      const tempFirstElement = firstCardElement;
      const tempSecondElement = secondCardElement;
      setTimeout(() => {
        tempFirstElement.classList.remove("clicked");
        tempSecondElement.classList.remove("clicked");
        lockBoard = false;
      }, 1000);
    }
    // reset cards
    firstCardElement = null;
    secondCardElement = null;
    firstCardElementBack = null;
    secondCardElementBack = null;
  }
};
const endGame = () => {
  clearInterval(timerId);
  gameWrapper.classList.add("hide");
  startGameBtn.classList.remove("hide");
  resultContainer.classList.add("hide");
};
startGameBtn.addEventListener("click", startGame);
restartGame.addEventListener("click", startGame);
endGameBtn.addEventListener("click", endGame);
////////shuffle///////////////

// let tempArray = [...imgsArray];
// let shuffledArray = [];

// for (let index = 0; index < imgsArray.length; index++) {
//   const randomIndex = Math.floor(Math.random() * tempArray.length);
//   shuffledArray.push(tempArray[randomIndex]);
//   tempArray.splice(randomIndex, 1);
// }
// console.log(shuffledArray);
/////////// shuffle with sort func///////
// .sort(() => Math.random() - 0.5)
