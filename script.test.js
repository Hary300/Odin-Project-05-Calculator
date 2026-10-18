const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

Object.defineProperty(HTMLElement.prototype, 'innerText', {
  configurable: true,
  get() {
    return this.textContent;
  },
  set(value) {
    this.textContent = value;
  },
});

function loadCalculator() {
  const parsedHtml = new DOMParser().parseFromString(html, 'text/html');
  document.body.innerHTML = parsedHtml.body.innerHTML;
  jest.resetModules();
  require('./script.js');
}

function clickNumber(value) {
  const button = [...document.querySelectorAll('.number')].find(
    (element) => element.textContent === String(value)
  );
  button.click();
}

function clickOperator(value) {
  const button = [...document.querySelectorAll('.operator')].find(
    (element) => element.textContent === value
  );
  button.click();
}

function clickDecimal() {
  document.querySelector('.decimal').click();
}

function clickEqual() {
  document.querySelector('.equal').click();
}

function displayValue() {
  return document.querySelector('.display').textContent;
}

// Panduan: Tahap 13 - Uji Seluruh Alur
beforeEach(loadCalculator);

describe('calculator operations', () => {
  test.each([
    ['addition', ['4', '+', '3'], '7'],
    ['subtraction', ['9', '-', '4'], '5'],
    ['multiplication', ['6', '*', '7'], '42'],
    ['division', ['8', '/', '2'], '4'],
    ['modulo', ['8', '%', '3'], '2'],
  ])('calculates %s', (_name, input, expected) => {
    clickNumber(input[0]);
    clickOperator(input[1]);
    clickNumber(input[2]);
    clickEqual();

    expect(displayValue()).toBe(expected);
  });

  test('respects multiplication precedence', () => {
    clickNumber('2');
    clickOperator('+');
    clickNumber('3');
    clickOperator('*');
    clickNumber('4');
    clickEqual();

    expect(displayValue()).toBe('14');
  });

  test('evaluates operators of equal precedence from left to right', () => {
    clickNumber('8');
    clickOperator('/');
    clickNumber('4');
    clickOperator('*');
    clickNumber('2');
    clickEqual();

    expect(displayValue()).toBe('4');
  });

  test('removes floating-point precision noise', () => {
    clickNumber('0');
    clickDecimal();
    clickNumber('1');
    clickOperator('+');
    clickNumber('0');
    clickDecimal();
    clickNumber('2');
    clickEqual();

    expect(displayValue()).toBe('0.3');
  });

  test.each(['/', '%'])(
    'shows an error when dividing by zero with %s',
    (operator) => {
      clickNumber('8');
      clickOperator(operator);
      clickNumber('0');
      clickEqual();

      expect(displayValue()).toBe('Error');
    }
  );
});

describe('calculator input', () => {
  test('does not allow a second decimal in the same number', () => {
    clickNumber('1');
    clickDecimal();
    clickNumber('5');
    clickDecimal();
    clickNumber('2');

    expect(displayValue()).toBe('1.52');
  });

  test('starts a zero-prefixed decimal after an operator', () => {
    clickNumber('1');
    clickOperator('+');
    clickDecimal();
    clickNumber('5');
    clickEqual();

    expect(displayValue()).toBe('1.5');
  });

  test('replaces the previous operator when another is pressed', () => {
    clickNumber('5');
    clickOperator('+');
    clickOperator('*');
    clickNumber('2');
    clickEqual();

    expect(displayValue()).toBe('10');
  });

  test('ignores equals on an incomplete expression', () => {
    clickNumber('5');
    clickOperator('+');
    clickEqual();

    expect(displayValue()).toBe('5+');
  });

  test('deletes one character and returns to zero when emptied', () => {
    clickNumber('1');
    clickNumber('2');
    document.getElementById('del').click();
    expect(displayValue()).toBe('1');
    document.getElementById('del').click();

    expect(displayValue()).toBe('0');
  });

  test('clear resets an expression', () => {
    clickNumber('1');
    clickOperator('+');
    clickNumber('2');
    document.getElementById('clear').click();

    expect(displayValue()).toBe('0');
  });

  test('starts a new expression when a number is entered after equals', () => {
    clickNumber('2');
    clickOperator('+');
    clickNumber('3');
    clickEqual();
    clickNumber('9');

    expect(displayValue()).toBe('9');
  });

  test('starts a new decimal number after equals', () => {
    clickNumber('2');
    clickOperator('+');
    clickNumber('3');
    clickEqual();
    clickDecimal();
    clickNumber('4');

    expect(displayValue()).toBe('0.4');
  });

  test('continues from the result when an operator is entered after equals', () => {
    clickNumber('2');
    clickOperator('+');
    clickNumber('3');
    clickEqual();
    clickOperator('+');
    clickNumber('4');
    clickEqual();

    expect(displayValue()).toBe('9');
  });

  test('supports a negative result', () => {
    clickNumber('3');
    clickOperator('-');
    clickNumber('8');
    clickEqual();

    expect(displayValue()).toBe('-5');
  });

  test('recovers from an error with delete', () => {
    clickNumber('8');
    clickOperator('/');
    clickNumber('0');
    clickEqual();
    document.getElementById('del').click();

    expect(displayValue()).toBe('0');
  });
});
