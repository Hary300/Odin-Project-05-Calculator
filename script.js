// function add(a, b) {
//   return (a + b).toFixed(2);
// }

// function subtract(a, b) {
//   return a - b;
// }

// function multiply(a, b) {
//   return a * b;
// }

// function divide(a, b) {
//   const result = Number.isInteger(a / b) ? a / b : (a / b).toFixed(2);
//   return result;
// }

// let number1 = '';
// let operator = '';
// let number2 = '';

// const screenElement = document.querySelector('.screen span');
// const clearElement = document.querySelector('.clear');
// const numberElements = document.querySelectorAll('.number');
// const operatorButtonElements = document.querySelectorAll('.operator-btn');
// const screenOperatorElement = document.querySelector('.operator');
// const equalElement = document.querySelector('.equal');

// clearElement.addEventListener('click', reset);

// function reset() {
//   screenElement.textContent = '0';
//   screenOperatorElement.textContent = '';
//   number1 = '';
//   operator = '';
//   number2 = '';
// }

// numberElements.forEach((numberEl) =>
//   numberEl.addEventListener('click', getNumberInput)
// );

// operatorButtonElements.forEach((operatorButtonEl) =>
//   operatorButtonEl.addEventListener('click', getOperator)
// );

// function getNumberInput(event) {
//   const value = event.currentTarget.dataset.number;
//   screenElement.textContent =
//     screenElement.textContent === '0'
//       ? value
//       : screenElement.textContent + value;

//   if (!operator) {
//     number1 += value;
//   } else {
//     number2 += value;
//     screenElement.textContent = number2;
//   }
// }

// function getOperator(event) {
//   if (number1 && operator && number2) {
//     operate(number1, operator, number2);
//   }
//   const selectedOperator = event.currentTarget.dataset.operator;
//   screenOperatorElement.textContent = selectedOperator;
//   operator = selectedOperator;
// }

// equalElement.addEventListener('click', () => {
//   operate(number1, operator, number2);
// });

// function operate(num1, op, num2) {
//   if (!num1 || !op || !num2) {
//     return;
//   }

//   switch (op) {
//     case '+':
//       number1 = add(Number(num1), Number(num2));
//       screenElement.textContent = number1;
//       number2 = '';
//       break;
//     case '-':
//       number1 = subtract(Number(num1), Number(num2));
//       screenElement.textContent = number1;
//       number2 = '';
//       break;
//     case '*':
//       number1 = multiply(Number(num1), Number(num2));
//       screenElement.textContent = number1;
//       break;
//     case '/':
//       number1 = divide(Number(num1), Number(num2));
//       screenElement.textContent = number1;
//       number2 = '';
//       break;
//   }
// }

const displayElement = document.querySelector('.calculator__display');
const buttonContainerElement = document.querySelector('.calculator__key');

let number1 = '';
let operator = '';
let number2 = '';
let isWaitingForSecondNumber = false;

buttonContainerElement.addEventListener('click', (event) => {
  const numberElement = event.target.closest('.number');
  if (numberElement) {
    const number = numberElement.dataset.number;
    displayElement.textContent =
      displayElement.textContent === '0'
        ? number
        : displayElement.textContent + number;

    if (isWaitingForSecondNumber) {
      number2 = number;
      displayElement.textContent = number2;
    }
  }

  const operatorElement = event.target.closest('.key--operator');
  if (operatorElement) {
    const op = operatorElement.dataset.action;
    operator = op;
    number1 = displayElement.textContent;
    isWaitingForSecondNumber = true;
  }
});
