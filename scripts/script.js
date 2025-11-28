const numButtons = document.querySelectorAll(".num-button");
const opButtons = document.querySelectorAll(".op-button");
const clearButton = document.querySelector("#clear");
const decimalButton = document.querySelector("#dec");
const deleteButton = document.querySelector("#delete");
const equalButton = document.querySelector("#equal");
const logs = document.querySelector(".logs");
const screen = document.querySelector(".calculator-screen");
let op1 = (op2 = operation = null);

function add(a, b) {
  return +a + +b;
}

function subtract(a, b) {
  return +a - +b;
}

function multiply(a, b) {
  return +a * +b;
}

function divide(a, b) {
  return +a / +b;
}

function addHistory(op1, op2, operation) {
  const log = document.createElement("div");
  log.classList.add("log");
  const result = screen.textContent;
  const logText = document.createTextNode(
    `${op1} ${operation} ${op2} = ${result}`
  );
  log.appendChild(logText);
  logs.appendChild(log);
}

function operate(op1, op2, operation) {
  switch (operation) {
    case "+":
      return add(op1, op2);
    case "-":
      return subtract(op1, op2);
    case "x":
      return multiply(op1, op2);
    case "÷":
      return divide(op1, op2);
  }
}

// DISPLAY NUMBERS ON SCREEN
numButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (screen.textContent === "0") {
      screen.textContent = e.target.id;
    } else {
      screen.textContent += e.target.id;
    }
  });
});

// HANDLE OPERATIONS
opButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    op1 = screen.textContent;
    operation = e.target.id;
    screen.textContent = "0";
  });
});

// NEEDS FIXING TO DISABLE DOING EQUALS WHEN INCOMPLETE OPERATION
equalButton.addEventListener("click", (e) => {
  op2 = screen.textContent;
  let ans = operate(op1, op2, operation);
  screen.textContent = Math.round(ans * 1000) / 1000;
  addHistory(op1, op2, operation);
});

// ADD DECIMAL POINT
decimalButton.addEventListener("click", (e) => {
  if (!screen.textContent.includes(".")) {
    screen.textContent += ".";
  }
});

// DELETE LAST SYMBOL ON SCREEN
deleteButton.addEventListener("click", (e) => {
  let textLength = screen.textContent.length;
  if (textLength > 1) {
    screen.textContent = screen.textContent.substring(0, textLength - 1);
  } else {
    screen.textContent = "0";
  }
});

// RESET EVERYTHING
clearButton.addEventListener("click", (e) => {
  op1 = op2 = operation = null;
  screen.textContent = "0";
  while (logs.firstChild) {
    logs.removeChild(logs.lastChild);
  }
});
