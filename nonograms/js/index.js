import "./create-elements.js";
import { fiveCells } from "./dataArrs.js";

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
const select5 = document.querySelector(".select");
const saveGame = document.querySelector(".save");
const continueGame = document.querySelector(".continue");
const toggleTheme = document.querySelector(".toggle-theme");
const useDark = window.matchMedia("(prefers-color-scheme: dark)");
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

let indexGame = 0;

let showRes;

let lastGame;

let indexLastGame;

showTimer(0, 0);

/**
 * Поставить черную клетку
 */
allNonogramms.addEventListener("click", (e) => {
  startTimer();
  if (
    e.target === e.currentTarget ||
    checkArrVerification(fiveCells[indexGame].arr, userArr) ||
    showRes
  ) {
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

  if (checkArrVerification(fiveCells[indexGame].arr, userArr)) {
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

  if (
    e.target === e.currentTarget ||
    checkArrVerification(fiveCells[indexGame].arr, userArr) ||
    showRes
  ) {
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

function analyzeLeftNumber() {
  fiveCells[indexGame].arr.forEach((item, index) => {
    const hint = createArrForAnalyzeLeft(item);

    leftNum.childNodes[index].innerHTML = hint
      .map((el) => `<span>${el}</span>`)
      .join("");
  });
}

analyzeLeftNumber();

/**
 * создание подсказок сверху
 */
function createArrForAnalyzeTop(columnNum) {
  const hints = [];
  numTopHints = 0;

  for (let i = 0; i <= 4; i++) {
    if (fiveCells[indexGame].arr[i][columnNum] === 1) {
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
  showRes = null;
  allNonogramms.childNodes.forEach((item) => {
    item.classList.remove("black-background");
    item.classList.remove("cross");
  });

  userArr = JSON.parse(JSON.stringify(initialArr));
}

resetBtn.addEventListener("click", (e) => {
  combineFunctions();
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
  let finishArr;

  finishArr = JSON.parse(JSON.stringify(fiveCells[indexGame].arr)).flat();

  finishArr.forEach((item, index) => {
    if (timerId) {
      clearInterval(timerId);
    }

    allNonogramms.childNodes[index].classList.remove("cross");

    if (item === 1) {
      allNonogramms.childNodes[index].classList.add("black-background");
    } else {
      allNonogramms.childNodes[index].classList.remove("black-background");
    }
  });
}

resolve.addEventListener("click", (e) => {
  showRes = true;
  showResolve();
});

/**
 * создание выпадающего списка с играми
 */
function createListGame() {
  fiveCells.forEach((item, index) => {
    const nameGame = document.createElement("option");
    nameGame.value = index;
    nameGame.classList.add("option");
    nameGame.textContent = item.name;
    select5.append(nameGame);
  });
}

createListGame();

/**
 * выбор игры в выпадающем списке
 */
select5.addEventListener("input", (e) => {
  showRes = null;
  indexGame = +e.target.value;
  analyzeLeftNumber();
  analyzeTopNumber();
  combineFunctions();
});

/**
 * объединение функций
 */
function combineFunctions() {
  resetGame();
  removeText();
  clearInterval(timerId);
  timerId = null;
  time = 0;
  showTimer(0, 0);
}

/**
 * переключение темы
 */
function toggleDarkMode(state) {
  document.documentElement.classList.toggle("dark-mode", state);
}
toggleDarkMode(useDark.matches);

useDark.addListener((evt) => toggleDarkMode(evt.matches));

toggleTheme.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark-mode");
});

/**
 * сохранение последней игры
 */
saveGame.addEventListener("click", (e) => {
  lastGame = JSON.parse(JSON.stringify(userArr));
  localStorage.setItem("last", JSON.stringify(lastGame));
  localStorage.setItem("lastTime", JSON.stringify(time));
  localStorage.setItem("indexGame", JSON.stringify(indexGame));
  indexLastGame = select5.childNodes[indexGame].value;
});

/**
 * возобновить работу таймера с того же места
 */
function startLastTimer() {
  clearInterval(timerId);
  timerId = null;
  time = JSON.parse(localStorage.getItem("lastTime"));
  startTimer();
}

/**
 * вернуть последнюю игру
 */
function continueLastGame() {
  const saveLastGame = JSON.parse(localStorage.getItem("last"));

  if (saveLastGame === undefined) {
    return;
  }

  saveLastGame.flat().forEach((item, index) => {
    allNonogramms.childNodes[index].classList.remove("cross");

    if (item === 1) {
      allNonogramms.childNodes[index].classList.add("black-background");
    } else {
      allNonogramms.childNodes[index].classList.remove("black-background");
    }
  });

  return saveLastGame;
}

continueGame.addEventListener("click", (e) => {
  const game = continueLastGame();

  if (!game) {
    return;
  }

  startLastTimer();
  userArr = JSON.parse(JSON.stringify(continueLastGame()));
  select5.selectedIndex = indexLastGame;
  showRes = false;
  indexGame = JSON.parse(localStorage.getItem("indexGame"));
  analyzeLeftNumber();
  analyzeTopNumber();
  removeText();
});
