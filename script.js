const display = document.querySelector('.calculator-screen');
const buttons = document.querySelectorAll('.btn');

let currentValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

function updateDisplay() {
    display.textContent = currentValue;
}

function inputDigit(digit) {
    if (waitingForSecondValue) {
        currentValue = digit;
        waitingForSecondValue = false;
    } else {
        currentValue = currentValue === '0' ? digit : currentValue + digit;
    }
    updateDisplay();
}

function inputDecimal() {
    if (waitingForSecondValue) {
        currentValue = '0.';
        waitingForSecondValue = false;
        updateDisplay();
        return;
    }

    if (!currentValue.includes('.')) {
        currentValue += '.';
        updateDisplay();
    }
}

function calculate(first, second, operation) {
    switch (operation) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return second === 0 ? 'Error' : first / second;
        default:
            return second;
    }
}

function handleOperator(nextOperator) {
    const inputValue = Number(currentValue);

    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = inputValue;
    } else if (operator) {
        const result = calculate(firstValue, inputValue, operator);
        currentValue = String(result);
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
    updateDisplay();
}

function evaluateExpression() {
    if (operator === null || firstValue === null || waitingForSecondValue) {
        return;
    }

    const result = calculate(firstValue, Number(currentValue), operator);
    currentValue = String(result);
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
    updateDisplay();
}

function clearCalculator() {
    currentValue = '0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
    updateDisplay();
}

function deleteLastDigit() {
    if (waitingForSecondValue) {
        return;
    }

    currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
    updateDisplay();
}

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const value = button.textContent.trim();

        if (button.classList.contains('number')) {
            if (value === '.') {
                inputDecimal();
            } else {
                inputDigit(value);
            }
            return;
        }

        if (button.classList.contains('operator')) {
            handleOperator(value);
            return;
        }

        if (button.classList.contains('equal')) {
            evaluateExpression();
            return;
        }

        if (button.classList.contains('clear')) {
            clearCalculator();
            return;
        }

        if (button.classList.contains('delete')) {
            deleteLastDigit();
        }
    });
});

updateDisplay();
