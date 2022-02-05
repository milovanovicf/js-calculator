const result = document.querySelector(".result");
const numbers = document.querySelectorAll(".calculator__number");
const operators = document.querySelectorAll(".operator");

//OBJECT TO HOLD ALL THE DATA
const calculator = {
  valueDisplay: "0",
  first: null,
  waitingSecond: false,
  operator: null,
};

const inputNum = (num) => {
  const { valueDisplay, waitingSecond } = calculator;
  if (waitingSecond === true) {
    calculator.valueDisplay = num;
    calculator.waitingSecond = false;
  } else {
    if (calculator.valueDisplay === "0") {
      calculator.valueDisplay = num;
    } else calculator.valueDisplay = calculator.valueDisplay + num;
  }
};

const decimal = (dot) => {
  if (calculator.waitingSecond === true) {
    calculator.valueDisplay = "0.";
    calculator.waitingSecond = false;
    return;
  }
  if (calculator.valueDisplay !== ".") {
    calculator.valueDisplay += dot;
  }
};

const calculate = (firstNum, second, operator) => {
  if (operator === "+") {
    return firstNum + second;
  } else if (operator === "-") {
    return firstNum - second;
  } else if (operator === "×") {
    return firstNum * second;
  } else if (operator === "÷") {
    return firstNum / second;
  } else if (operator === "%") {
    return firstNum % second;
  }

  return second;
};

const handleOperator = (op) => {
  const { first, valueDisplay, operator } = calculator;
  const value = +valueDisplay;

  if (operator && calculator.waitingSecond) {
    calculator.operator = op;
    return;
  }

  if (first === null && !isNaN(value)) {
    calculator.first = value;
  } else if (operator) {
    const res = calculate(first, value, operator);
    calculator.valueDisplay = String(res);
    calculator.first = res;
  }

  calculator.waitingSecond = true;
  calculator.operator = op;
};

const resetCalc = () => {
  calculator.valueDisplay = "0";
  calculator.first = null;
  calculator.waitingSecond = false;
  calculator.operator = null;
};

const uptadeDisplay = () => {
  result.innerText = calculator.valueDisplay;
};

//LOOPING THROUGH NUMBERS
numbers.forEach((num) =>
  num.addEventListener("click", (e) => {
    e.preventDefault();

    if (num.innerText === ".") {
      decimal(num.innerText);
      uptadeDisplay();
      return;
    }

    inputNum(num.innerText);
    uptadeDisplay();
  })
);

//LOOPING THROUGH OPERATORS
operators.forEach((op) =>
  op.addEventListener("click", (e) => {
    e.preventDefault();

    if (op.innerText === "C") {
      resetCalc();
      uptadeDisplay();
      return;
    }

    handleOperator(op.innerText);
    uptadeDisplay();
  })
);
