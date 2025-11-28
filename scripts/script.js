const numButtons = document.querySelectorAll(".num-button");
const opButtons = document.querySelectorAll(".op-button");
const clearButton = document.querySelector("#clear");
const decimalButton = document.querySelector("#dec");
const deleteButton = document.querySelector("#delete");
const equalButton = document.querySelector("#equal");
const logs = document.querySelector(".logs");
const screen = document.querySelector(".calculator-screen");
let op1 = (op2 = op = null);
let appendMode = false;

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
  if (b == 0) {
    return "ERROR";
  }
  return +a / +b;
}

function addHistory(op1, op2, op) {
  const log = document.createElement("div");
  log.classList.add("log");
  const result = screen.textContent;
  const logText = document.createTextNode(`${op1} ${op} ${op2} = ${result}`);
  log.appendChild(logText);
  logs.appendChild(log);
}

function operate(op1, op2, op) {
  switch (op) {
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
    if (appendMode) {
      screen.textContent += e.target.id;
    } else {
      screen.textContent = e.target.id;
      appendMode = true;
    }
  });
});

// HANDLE OPERATIONS
opButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // Protect against non-numeric operands
    if (!isNaN(screen.textContent)) {
      op1 = screen.textContent;
      op = e.target.id;
      appendMode = false;
    } else {
      screen.textContent = "Invalid Operand";
    }
  });
});

// DISPLAY ANSWER AND LOG CALCULATION IN HISTORY
equalButton.addEventListener("click", (e) => {
  // op1 and op must exist (assumes op2 is value on screen)
  // to display answer and add log to history
  if (op1 && op) {
    op2 = screen.textContent;
    let ans = operate(op1, op2, op);
    if (isNaN(ans)) {
      screen.textContent = ans; // For errors
    } else {
      screen.textContent = Math.round(ans * 1000) / 1000;
    }
    addHistory(op1, op2, op);

    // If next button press == numButton: op1 = newNumber
    // Else: op1 = ans (on-screen)
    op2 = op = null;
    appendMode = false;
  }
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
  op1 = op2 = op = null;
  screen.textContent = "0";
  appendMode = false;
  while (logs.firstChild) {
    logs.removeChild(logs.lastChild);
  }
});
