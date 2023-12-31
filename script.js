const clearAllButton = document.querySelector('.clearAll');
const backSpace = document.querySelector('.backSpace');
const positiveNegative = document.querySelector('.positiveNegative');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
let decimalPoint = document.querySelector('.decimalPoint');
let numbers = document.querySelectorAll('.numbers');

let outputBox = document.querySelector('.outputBox');
let calculationBox = document.querySelector('.calculationBox');

equals.addEventListener('click', equalsHandler);
clearAllButton.addEventListener('click', clearAll);
positiveNegative.addEventListener('click', positiveNegativeSwitch);
backSpace.addEventListener('click', backSpaceHandler);
decimalPoint.addEventListener('click', decimalPointHandler);

function operate(accumulator, operator, number){
    switch(operator){
        case '/':
            outputBox.textContent = division(accumulator, number);
        break;
        case '*':
            outputBox.textContent = multiplication(accumulator, number);
        break;
        case '+':
            outputBox.textContent = addition(accumulator, number);
        break;
        case '-':
            outputBox.textContent = subtraction(accumulator, number);
        break;
        default:
            return null;
    };
    roundingDecimalPoints();
    limitNumberSize();
    if(outputBox.textContent.includes('.')){
        decimalPoint.disabled = true;
    }
};

function operatorClickHandler(){
    equals.disabled = true;
    const operatorsArray = ['*', '/', '+', '-'];
    [...operators].map(operation => {
        operation.addEventListener('click', () => {
            limitNumberSize();
            decimalPoint.disabled = false;
            equals.disabled = false;
            if(calculationBox.textContent == ''){
                calculationBox.textContent = outputBox.textContent + operation.value;
                outputBox.textContent = '';
            } else if(!calculationBox.textContent.split('').slice(-1).some(lastLetter => operatorsArray.includes(lastLetter))){
                calculationBox.textContent = outputBox.textContent += operation.value;
                outputBox.textContent = '';
            } else if(calculationBox.textContent.split('').some(allLetters => operatorsArray.includes(allLetters))){
                calculationBox.textContent = calculationBox.textContent.slice(0,-1)+operation.value;
            };
            // if(typeof calculationBox.textContent.slice(-1) == 'string' && outputBox.textContent == ''){
            //     equals.disabled = true;
            // };
        });
            
    });
};
operatorClickHandler();

function numberClickHandler(){
    [...numbers].map(number => {
        number.addEventListener('click', () => {
            limitNumberSize();
            outputBox.textContent += number.value;
            if(equals.disabled == true){
                equals.disabled = true;
            } else {
                equals.disabled = false;
            };
            backSpace.disabled = false;
        });
    });
};
numberClickHandler();

function equalsHandler(){
    if(outputBox.textContent !== ''){
        let accumulator = Number(calculationBox.textContent.slice(0, -1));
        let number = Number(outputBox.textContent);
        let operator = calculationBox.textContent.at(-1);
        calculationBox.textContent = calculationBox.textContent + outputBox.textContent;
        equals.disabled = true;
        operate(accumulator, operator, number);
    };
};
function limitNumberSize(){
    if(outputBox.textContent.length > 14){
        outputBox.textContent = 'Number too big';
        setTimeout(() => {
        outputBox.textContent = '';
        calculationBox.textContent = '';
        decimalPoint.disabled = false;
        }, 2000);
    };
};
function positiveNegativeSwitch(){
    if(outputBox.textContent == ''){
        return;
    } else {
        outputBox.textContent = Number(outputBox.textContent * -1);
    };
};
function division(accumulator, number){
    return accumulator / number;
};
function multiplication(accumulator, number){
    return accumulator * number;
};
function addition(accumulator, number){
    return accumulator + number;
};
function subtraction(accumulator, number){
    return accumulator - number;
};
function decimalPointHandler(){
    outputBox.textContent += '.';
    decimalPoint.disabled = true;
};
function backSpaceHandler(){  
    outputBox.textContent = outputBox.textContent.slice(0,-1);
    if(outputBox.textContent.includes('.')){
        decimalPoint.disabled = true;
    } else {
        decimalPoint.disabled = false;
    };
    if(outputBox.textContent == ''){
        backSpace.disabled = true;
    };
};
function clearAll(){
    outputBox.textContent = '';
    calculationBox.textContent = '';
    decimalPoint.disabled = false;
};
function roundingDecimalPoints(){
    if(outputBox.textContent.includes('.')){
        let splitOutputBox = outputBox.textContent.split('.');
        if(splitOutputBox[1].length >= 4){
            outputBox.textContent = Math.round(outputBox.textContent * 1000)/1000;
        }
    };
};