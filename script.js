// Panduan: Tahap 2 - Ambil Elemen HTML
const display = document.querySelector('.display');
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const decimal = document.querySelector('.decimal');
const equal = document.querySelector('.equal');
const clear = document.getElementById('clear');
const del = document.getElementById('del');

// Panduan: Tahap 3 - Tentukan State yang Perlu Diingat
let saveValue = '0';
let isCalculated = false;

// Panduan: Tahap 5 - Buat Tombol Angka
numbers.forEach((number) =>
  number.addEventListener('click', () => {
    if (isCalculated || saveValue === '0') saveValue = '';
    saveValue += number.innerText;
    isCalculated = false;
    updateDisplay();
  })
);

// Panduan: Tahap 6 - Buat Tombol Operator
operators.forEach((operator) =>
  operator.addEventListener('click', () => {
    const nextOperator = operator.innerText;
    if (isCalculated && saveValue === 'Error') return;
    if (isCalculated) isCalculated = false;
    if (saveValue === '0' && nextOperator !== '-') return;

    if (/[+\-*/%]$/.test(saveValue)) {
      saveValue = saveValue.slice(0, -1) + nextOperator;
    } else {
      saveValue += nextOperator;
    }
    isCalculated = false;
    updateDisplay();
  })
);

// Panduan: Tahap 7 - Buat Tombol Desimal
decimal.addEventListener('click', () => {
  if (isCalculated) {
    saveValue = '0';
    isCalculated = false;
  }
  const currentNumber = saveValue.split(/[+%*/-]/).pop();
  if (currentNumber.includes('.')) return;
  if (/[+\-*/%]$/.test(saveValue)) saveValue += '0';
  saveValue += decimal.innerText;
  updateDisplay();
});

// Panduan: Tahap 12 - Hubungkan Tombol Sama Dengan
equal.addEventListener('click', () => {
  if (/[+\-*/%]$/.test(saveValue)) return;
  const result = evaluateExpression(saveValue);
  if (!Number.isFinite(result)) {
    saveValue = 'Error';
  } else {
    saveValue = String(Number(result.toFixed(10)));
  }
  isCalculated = true;
  updateDisplay();
});

// Panduan: Tahap 4 - Buat Satu Fungsi untuk Memperbarui Layar
function updateDisplay() {
  display.textContent = saveValue || '0';
}

function evaluateExpression(expression) {
  // Panduan: Tahap 10 - Pecah Ekspresi Menjadi Token
  const tokens = expression.match(/\d+(?:\.\d*)?|\.\d+|[+\-*/%]/g);
  if (!tokens || tokens.join('') !== expression) return NaN;
  if (tokens.length === 1) return Number(tokens[0]);
  if (tokens.length < 3) return NaN;
  if (tokens[0] === '-') tokens.unshift('0');
  if (tokens.length % 2 === 0) return NaN;

  // Panduan: Tahap 11 - Hitung dengan Prioritas Operator
  const values = [Number(tokens[0])];
  const pendingOperators = [];
  for (let index = 1; index < tokens.length; index += 2) {
    const operator = tokens[index];
    const value = Number(tokens[index + 1]);
    if (!Number.isFinite(value)) return NaN;
    if (operator === '*' || operator === '/' || operator === '%') {
      values[values.length - 1] = operate(
        values[values.length - 1],
        operator,
        value
      );
    } else {
      pendingOperators.push(operator);
      values.push(value);
    }
  }

  return values
    .slice(1)
    .reduce(
      (result, value, index) => operate(result, pendingOperators[index], value),
      values[0]
    );
}

// Panduan: Tahap 9 - Buat Operasi Matematika Dasar
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function modulo(a, b) {
  return a % b;
}

function operate(number1, operator, number2) {
  let result;

  switch (operator) {
    case '+':
      result = add(number1, number2);
      break;
    case '-':
      result = subtract(number1, number2);
      break;
    case '*':
      result = multiply(number1, number2);
      break;
    case '/':
      result = divide(number1, number2);
      break;
    case '%':
      result = modulo(number1, number2);
      break;
    default:
      return NaN;
  }

  return result;
}

// Panduan: Tahap 8 - Buat Tombol AC dan DEL
clear.addEventListener('click', () => {
  saveValue = '0';
  isCalculated = false;
  updateDisplay();
});

// Panduan: Tahap 8 - Buat Tombol AC dan DEL
del.addEventListener('click', () => {
  if (saveValue === 'Error') {
    saveValue = '0';
    isCalculated = false;
    updateDisplay();
    return;
  }
  saveValue = saveValue.slice(0, -1);
  if (!saveValue || saveValue === '-') saveValue = '0';
  isCalculated = false;
  updateDisplay();
});
