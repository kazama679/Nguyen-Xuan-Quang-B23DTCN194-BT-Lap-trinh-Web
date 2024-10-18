let displayValue = '0';
let firstOperand = null;
let secondOperand = false;
let currentOperator = null;

function inputDigit(digit) {
  if (secondOperand === true) {
    displayValue = digit;
    secondOperand = false;
  } else {
    displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (secondOperand === true) {
    displayValue = '0.';
    secondOperand = false;
    return;
  }

  if (!displayValue.includes(dot)) {
    displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(displayValue);

  if (currentOperator && secondOperand)  {
    currentOperator = nextOperator;
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    firstOperand = inputValue;
  } else if (currentOperator) {
    const result = calculate(firstOperand, inputValue, currentOperator);
    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstOperand = result;
  }

  secondOperand = true;
  currentOperator = nextOperator;
}

function calculate(first, second, operator) {
  if (operator === '+') {
    return first + second;
  } else if (operator === '-') {
    return first - second;
  } else if (operator === '*') {
    return first * second;
  } else if (operator === '/') {
    return first / second;
  }
  return second;
}

function resetCalculator() {
  displayValue = '0';
  firstOperand = null;
  secondOperand = false;
  currentOperator = null;
}

function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = displayValue;
}

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  const { target } = event;

  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    if (target.value === 'C') {
      resetCalculator();
      updateDisplay();
    } else {
      handleOperator(target.value);
      updateDisplay();
    }
    return;
  }

  if (target.value === '.') {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.value === 'C') {
    resetCalculator();
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});
