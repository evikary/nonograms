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

const allnono = document.querySelector(".nonogram");
const topNum = document.querySelector(".top-numbers");
const leftNum = document.querySelector(".left-numbers");
const leftFirstNum = document.querySelector(".first-num");
const leftSecondNum = document.querySelector(".second-num");
console.log(leftFirstNum);

let userArr = initialArr;
let row;
let column;

let rowLeftHints;
let numLeftHints;
let firstNumLeft = 0;
let secondNumLeft = 0;

allnono.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    return;
  }

  e.target.classList.toggle("black-background");

  allnono.childNodes.forEach((item, index) => {
    if (e.target === item) {
      row = Math.trunc(index / 5);
      column = index % 5;
      // console.log("row:", row, "column:", column);
    }
  });

  userArr[row][column] = userArr[row][column] === 0 ? 1 : 0;
  //   console.log("userArr", userArr);
  checkArr(arr1, userArr);
});

function checkArr(array1, array2) {
  //   console.log("array1:", array1, "array2:", array2);
  const res = array1.every((item, index) =>
    array1[index].every((el, i) => el === array2[index][i])
  );

  if (res) {
    console.log("Вы молодец!");
  } else {
    console.log("Попробуте еще");
  }
}

checkArr(arr1, initialArr);

function changeDirection() {
  topNum.childNodes.forEach((item, index) => {
    item.classList.add("direction-numbers");
  });
}

changeDirection();

function createArr(arr) {
  const hints = [];
  firstNumLeft = 0;
  for (let i = 0; i <= arr.length - 1; i++) {
    if (arr[i] === 1) {
      firstNumLeft++;
    } else {
      hints.push(firstNumLeft);
      firstNumLeft = 0;
    }
  }
  hints.push(firstNumLeft);
  return hints;
}

function analyzeLeftNumber(arr) {
  arr.forEach((item, index) => {
    if (item.includes(1)) {
      rowLeftHints = index;

      const hint = createArr(item);
      const n = hint.filter((item) => item !== 0);

      if (n.length === 1) {
        leftNum.childNodes[rowLeftHints].textContent = [...n];
      }

      if (n.length === 2) {
        leftNum.childNodes[rowLeftHints].childNodes[0].textContent = n[0];
        leftNum.childNodes[rowLeftHints].childNodes[1].textContent = n[1];
      }

      if (n.length === 3) {
        leftNum.childNodes[rowLeftHints].childNodes[0].textContent = n[0];
        leftNum.childNodes[rowLeftHints].childNodes[1].textContent = n[1];
        leftNum.childNodes[rowLeftHints].childNodes[2].textContent = n[2];
      }
    }
  });
}

analyzeLeftNumber(arr1);
