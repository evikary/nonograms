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

let userArr = initialArr;
let row;
let column;

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
