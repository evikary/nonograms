let num;
let nono;

function createNumbers() {
  num = document.createElement("div");
  num.classList.add("numbers");
}

function createNonograms() {
  nono = document.createElement("div");
  nono.classList.add("nonograms");
}

const createElements = () => {
  const main = document.createElement("main");
  main.classList.add("main");

  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");

  const topNumbers = document.createElement("section");
  topNumbers.classList.add("top-numbers");

  const container = document.createElement("div");
  container.classList.add("container");

  const boxContainer = document.createElement("div");
  boxContainer.classList.add("box-container");

  const resetButton = document.createElement("button");
  resetButton.classList.add("reset");
  resetButton.textContent = "reset game";

  const resolveButton = document.createElement("button");
  resolveButton.classList.add("resolve");
  resolveButton.textContent = "show solution";

  const choiceEasygame = document.createElement("select");
  choiceEasygame.classList.add("select");

  for (let i = 1; i <= 5; i++) {
    createNumbers();
    topNumbers.append(num);
  }

  const leftNumbers = document.createElement("section");
  leftNumbers.classList.add("left-numbers");

  for (let i = 1; i <= 5; i++) {
    createNumbers();
    leftNumbers.append(num);
  }

  const nonogram = document.createElement("section");
  nonogram.classList.add("nonogram");

  for (let i = 1; i <= 25; i++) {
    createNonograms();
    nonogram.append(nono);
  }
  ///
  container.append(leftNumbers);
  container.append(nonogram);
  wrapper.append(topNumbers);
  wrapper.append(container);
  wrapper.append(boxContainer);
  wrapper.append(choiceEasygame);
  wrapper.append(resolveButton);
  wrapper.append(resetButton);
  main.append(wrapper);
  document.body.prepend(main);
};

createElements();
