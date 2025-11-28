const numButtons = document.querySelectorAll(".num-button");
const opButtons = document.querySelectorAll(".op-button");
const clearButton = document.querySelector("#clear");
const decimalButton = document.querySelector("#dec");
const deleteButton = document.querySelector("#delete");
const equalButton = document.querySelector("#equal");
const logs = document.querySelector(".logs");
const screen = document.querySelector(".calculator-screen");
let op1 = (op2 = op = ans = null);
let appendMode = (opFlag = false);

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
    return "IMPOSSIBLE";
  }
  return +a / +b;
}

function addHistory(op1, op2, op, ans) {
  const log = document.createElement("div");
  log.classList.add("log");
  const logText = document.createTextNode(`${op1} ${op} ${op2} = ${ans}`);
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

function reset() {
  op1 = op2 = op = ans = null;
  appendMode = opFlag = false;
}

function displayNumber(num) {
  if (appendMode && screen.textContent !== "0") {
    screen.textContent += num;
  } else {
    screen.textContent = num;
    appendMode = true;
  }
  opFlag = false;
}

function pickOperation(operation) {
  if (!opFlag) {
    opFlag = true;
    // If there is a chained operation
    if (op) {
      // Check if there is an error
      if (isNaN(op1)) {
        screen.textContent = "Invalid Operand";
        reset();
      } else {
        op2 = screen.textContent;
        let ans = operate(op1, op2, op);
        if (isNaN(ans)) {
          screen.textContent = ans; // For errors
        } else {
          screen.textContent = Math.round(ans * 1000) / 1000;
        }
        addHistory(op1, op2, op, ans);
        if (isNaN(ans)) {
          op1 = null;
        } else {
          op1 = ans;
        }
        op2 = null;
        op = operation;
        appendMode = false;
      }
    } else {
      // Check if there is an error
      if (isNaN(screen.textContent)) {
        screen.textContent = "Invalid Operand";
        reset();
      } else {
        op1 = screen.textContent;
        op = operation;
        appendMode = false;
      }
    }
  }
}

function equate() {
  // To finalize operation, 3 conditions must be met:
  // 1. Operand 1 exists
  // 2. Operation exists
  // 3. Op2 is a NEW number on screen (implied by appendMode)
  if (op1 && op && appendMode) {
    op2 = screen.textContent;
    ans = operate(op1, op2, op);
    addHistory(op1, op2, op, ans);
    if (isNaN(ans)) {
      screen.textContent = ans; // For errors
      reset();
    } else {
      screen.textContent = Math.round(ans * 1000) / 1000;
      // If next button press == numButton: op1 = newNumber
      // Else: op1 = ans (on-screen)
      op2 = op = null;
      appendMode = opFlag = false;
    }
  }
}

function addDecimalPoint() {
  if (!screen.textContent.includes(".")) {
    screen.textContent += ".";
  }
}

function deleteNumber() {
  let textLength = screen.textContent.length;
  if (textLength > 1) {
    screen.textContent = screen.textContent.substring(0, textLength - 1);
  } else {
    screen.textContent = "0";
  }
}

function clearScreen() {
  op1 = op2 = op = null;
  screen.textContent = "0";
  appendMode = opFlag = false;
  while (logs.firstChild) {
    logs.removeChild(logs.lastChild);
  }
}

// EVENT LISTENERS

// DISPLAY NUMBERS ON SCREEN
numButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    displayNumber(e.target.id);
  });
});

// HANDLE OPERATIONS
opButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    pickOperation(e.target.id);
  });
});

// DISPLAY ANSWER AND LOG CALCULATION IN HISTORY
equalButton.addEventListener("click", equate);

// ADD DECIMAL POINT
decimalButton.addEventListener("click", addDecimalPoint);

// DELETE LAST SYMBOL ON SCREEN
deleteButton.addEventListener("click", deleteNumber);

// RESET EVERYTHING
clearButton.addEventListener("click", clearScreen);
