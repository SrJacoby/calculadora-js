const result = document.querySelector('.result'); //pegar o resultado
const buttons = document.querySelectorAll('.buttons button'); //pega todos os botões

// Criar as variáveis dos cálculos
let currentNumber = ""; // número atual
let firstOpe = null; // primeiro número
let operator = null; // operador
let restart = false; // restart

// Funções:
function updateResult(originClear = false) {
    if (originClear) {
        result.innerText = '0';
    } else {
        const formattedNumber = parseFloat(currentNumber).toLocaleString('pt-BR');
        result.innerText = formattedNumber.replace(/\./g, ',');
    }
}

function addDigit(digit) {
    if (digit === ',' && currentNumber.includes(',')) 
        return;

    if (restart) {
        currentNumber = digit === ',' ? '0,' : digit;
        restart = false;
    } else {
        currentNumber += digit;
    }

    updateResult();
}

function setOperator(newOpe) {
    if (currentNumber) {
        calculate();
        firstOpe = parseFloat(currentNumber.replace(',', '.'));
        currentNumber = "";
    }
    operator = newOpe;
}

function calculate() {
    if (operator === null || firstOpe === null) 
        return;

    let secondOpe = parseFloat(currentNumber.replace(',', '.'));
    let valorFinal;

    switch (operator) {
        case '+':
            valorFinal = firstOpe + secondOpe;
            break;
        case '-':
            valorFinal = firstOpe - secondOpe;
            break;
        case 'x':
            valorFinal = firstOpe * secondOpe;
            break;
        case '÷':
            valorFinal = firstOpe / secondOpe;
            break;
        default:
            return;
    }

    currentNumber = valorFinal.toString();
    operator = null;
    firstOpe = null;
    restart = true;
    updateResult();
}

function setPorcentage() {
    let result = parseFloat(currentNumber) / 100;
    if (['+', '-'].includes(operator)) {
        result = result * (firstOpe || 1);
    }
    if (result.toString().split('.')[1]?.length > 5) {
        result = result.toFixed(5).toString();
    }
    currentNumber = result.toString();
    updateResult();
}

// Para limpar o visor
function clearCalculator() {
    currentNumber = '';
    firstOpe = null;
    operator = null;
    updateResult(true);
}

// Para cada botão
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const textButton = button.innerText;
        if (/^[0-9]+$/.test(textButton)) {
            addDigit(textButton);
        } 
        else if (textButton === ',') { // Verifica se o botão clicado é a vírgula
            addComma();
        } else if (['+', '-', 'x', '÷'].includes(textButton)) {
            setOperator(textButton);
        } else if (textButton === '=') {
            calculate();
        } else if (textButton === 'C') {
            clearCalculator();
        } else if (textButton === '±') {
            if (!currentNumber) {
                alert('Digite um número');
                return;
            }
            currentNumber = (parseFloat(currentNumber || firstOpe) * -1).toString();
            updateResult();
        } else if (textButton === '%') {
            if (!currentNumber) {
                alert('Digite um número');
                return;
            }
            setPorcentage();
        }
    });
}
);
function addComma() {
    addDigit(',');
}
