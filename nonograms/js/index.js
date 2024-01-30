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
console.log(wrapper);
const allNonogramms = document.querySelector(".nonogram");
const topNum = document.querySelector(".top-numbers");
const leftNum = document.querySelector(".left-numbers");

let userArr = initialArr;
let row;
let column;

let numLeftHints = 0;
let numTopHints = 0;

allNonogramms.addEventListener("click", (e) => {
  if (e.target === e.currentTarget || checkArrVerification(arr1, initialArr)) {
    return;
  }
  e.target.classList.toggle("black-background");

  allNonogramms.childNodes.forEach((item, index) => {
    if (e.target === item) {
      row = Math.trunc(index / 5);
      column = index % 5;
    }
  });

  userArr[row][column] = userArr[row][column] === 0 ? 1 : 0;

  if (checkArrVerification(arr1, userArr)) {
    createText();
  }
});

//создание текста для победителя
function createText() {
  const congratulation = document.createElement("h1");
  congratulation.innerHTML = `Great! <br />
        You have solved the nonogram!`;
  wrapper.prepend(congratulation);
}

//проверка на отгаданную нонограмму
function checkArrVerification(array1, array2) {
  const res = array1.every((item, index) =>
    array1[index].every((el, i) => el === array2[index][i])
  );

  return res;
}

//изменение напрвления чисел в подсказках
function changeDirection() {
  topNum.childNodes.forEach((item, index) => {
    item.classList.add("direction-numbers");
  });
}

changeDirection();

// создание подсказок слева
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

// создание подсказок сверху
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
