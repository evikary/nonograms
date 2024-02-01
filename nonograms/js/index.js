import "./create-elements.js";
import { arr1 } from "./dataArrs.js";

console.log("dataArrs", arr1);

const initialArr = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const wrapper = document.querySelector(".wrapper");
const allNonogramms = document.querySelector(".nonogram");
const topNum = document.querySelector(".top-numbers");
const leftNum = document.querySelector(".left-numbers");
const resetBtn = document.querySelector(".reset");
const timer = document.querySelector(".box-container");
const resolve = document.querySelector(".resolve");
const audioBlack = new Audio("./assets/audio1.mp3");
const audioCross = new Audio("./assets/audio2.mp3");
const audioClear = new Audio("./assets/audio3.mp3");
const audioWin = new Audio("./assets/audio4.mp3");

let userArr = JSON.parse(JSON.stringify(initialArr));
let row;
let column;

let numLeftHints = 0;
let numTopHints = 0;

let time = 0;
let timerId;

showTimer(0, 0);

allNonogramms.addEventListener("click", (e) => {
  startTimer();
  if (e.target === e.currentTarget || checkArrVerification(arr1, initialArr)) {
    return;
  }

  e.target.classList.remove("cross");

  if (e.target.className === "nonograms black-background") {
    audioClear.play();
    e.target.classList.remove("black-background");
  } else {
    audioBlack.play();
    e.target.classList.toggle("black-background");
  }

  allNonogramms.childNodes.forEach((item, index) => {
    if (e.target === item) {
      row = Math.trunc(index / 5);
      column = index % 5;
    }
  });

  userArr[row][column] = userArr[row][column] === 0 ? 1 : 0;

  if (checkArrVerification(arr1, userArr)) {
    createText();
    clearInterval(timerId);
    audioWin.play();
  }
});

/**
 * поставить крестик
 */
allNonogramms.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  startTimer();

  if (e.target === e.currentTarget) {
    return;
  }

  e.target.classList.remove("black-background");

  if (e.target.className === "nonograms cross") {
    audioClear.play();
    e.target.classList.remove("cross");
  } else {
    audioCross.play();
    e.target.classList.toggle("cross");
  }
});

/**
 * создание текста для победителя
 */
function createText() {
  const congratulation = document.createElement("h1");
  congratulation.innerHTML = `Great! <br />
        You have solved the nonogram in ${time} seconds!`;
  wrapper.prepend(congratulation);
}

/**
 * проверка на отгаданную нонограмму
 */
function checkArrVerification(array1, array2) {
  const res = array1.every((item, index) =>
    array1[index].every((el, i) => el === array2[index][i])
  );

  return res;
}

/**
 * изменение напрвления чисел в подсказках
 */
function changeDirection() {
  topNum.childNodes.forEach((item, index) => {
    item.classList.add("direction-numbers");
  });
}

changeDirection();

/**
 * создание подсказок слева
 */
function createArrForAnalyzeLeft(arr) {
  const hints = [];
  numLeftHints = 0;
  for (let i = 0; i <= arr.length - 1; i++) {
    if (arr[i] === 1) {
      numLeftHints++;
    } else {
      hints.push(numLeftHints);
      numLeftHints = 0;
    }
  }
  hints.push(numLeftHints);
  return hints.filter((item) => item !== 0);
}

function analyzeLeftNumber(arr) {
  arr.forEach((item, index) => {
    if (item.includes(1)) {
      const hint = createArrForAnalyzeLeft(item);

      leftNum.childNodes[index].innerHTML = hint
        .map((el) => `<span>${el}</span>`)
        .join("");
    }
  });
}

analyzeLeftNumber(arr1);

/**
 * создание подсказок сверху
 */
function createArrForAnalyzeTop(columnNum) {
  const hints = [];
  numTopHints = 0;

  for (let i = 0; i <= 4; i++) {
    if (arr1[i][columnNum] === 1) {
      numTopHints++;
    } else {
      hints.push(numTopHints);
      numTopHints = 0;
    }
  }
  hints.push(numTopHints);
  return hints.filter((item) => item !== 0);
}

function analyzeTopNumber() {
  const hint = [];

  for (let i = 0; i <= 4; i++) {
    hint.push(createArrForAnalyzeTop(i));
  }

  hint.forEach((item, index) => {
    topNum.childNodes[index].innerHTML = item
      .map((el) => `<span>${el}</span>`)
      .join("");
  });
}

analyzeTopNumber();

/**
 * сброс игры
 */
function resetGame() {
  allNonogramms.childNodes.forEach((item) => {
    item.classList.remove("black-background");
    item.classList.remove("cross");
  });

  userArr = JSON.parse(JSON.stringify(initialArr));
}

resetBtn.addEventListener("click", (e) => {
  resetGame();
  removeText();
  clearInterval(timerId);
  timerId = null;
  time = 0;
  showTimer(0, 0);
});

/**
 * удаление текста
 */
function removeText() {
  const text = document.querySelector("h1");
  if (text) {
    text.remove();
  }
}

/**
 * запуск таймера
 */
function startTimer() {
  if (timerId) {
    return;
  }

  timerId = setInterval(() => {
    time += 1;
    let minutes = 0;
    let seconds = 0;

    minutes = Math.trunc(time / 60);
    seconds = time % 60;

    showTimer(minutes, seconds);
  }, 1000);
}

/**
 * отображение таймера
 */
function showTimer(min, sec) {
  timer.textContent = `
  ${String(min).padStart(2, "0")} : ${String(sec).padStart(2, "0")}`;
}

/**
 * показать готовое решение
 */
function showResolve() {
  let finishArr = JSON.parse(JSON.stringify(arr1)).flat();

  finishArr.forEach((item, index) => {
    if (timerId) {
      clearInterval(timerId);
    }

    if (item === 1) {
      allNonogramms.childNodes[index].classList.add("black-background");
      allNonogramms.childNodes[index].classList.remove("cross");
    } else {
      allNonogramms.childNodes[index].classList.remove("black-background");
      allNonogramms.childNodes[index].classList.remove("cross");
    }
    console.log("className", allNonogramms.childNodes[index].className);
  });
}

resolve.addEventListener("click", (e) => {
  showResolve();
});
