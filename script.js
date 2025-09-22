let operand1 = "";
let operand2 = "";
let operator = "";
let result = null;
let hasSecondOperand = false;
let op = ["-", "+", "x", "÷"];


// define basic operations
let addition = (operand1, operand2) => operand1 + operand2;
let subtraction = (operand1, operand2) => operand1 - operand2;
let multiplication = (operand1, operand2) => operand1 * operand2;
let division = (operand1, operand2) => {
    if (operand2 === 0) {
        alert("Division by Zero Error!")
        return null;
    }
    return operand1 / operand2;
}



operate = (operator, operand1, operand2) => {
    switch (operator) {
        case "+": return addition(operand1, operand2);
        case "-": return subtraction(operand1, operand2);
        case "x": return multiplication(operand1, operand2);
        case "÷": return division(operand1, operand2);
        default: return null;
    }
}

const display = document.querySelector(".display");
const clearButton = document.querySelector("#clearButton");
clearButton.addEventListener("click", function(){
    display.textContent = "";
})

const backspaceButton = document.querySelector("#backspaceButton");
backspaceButton.addEventListener("click", function() {
    // clear the last digit entered
    display.textContent = display.textContent.slice(0, -1);
})


// initialize exp to keep track of user input
// initalize displayResult to show user input and calculation result
let exp = "";
let displayResult = "";
const buttons = document.querySelectorAll(".cal");
buttons.forEach((button) => button.addEventListener("click", function() {
    // current clicked or last clicked is a number, simply add to expression
    if (isNumber(button.textContent)) {
        updateExpression(button.textContent);
        displayResult = displayResult + button.textContent;
        display.textContent = displayResult;
    }
    else {
        switch (button.textContent) {
            case ".":
                // only allowed "." if the last enter value is NOT "."
                if (exp[exp.length-1] != ".") {
                    updateExpression(button.textContent);
                    displayResult = displayResult + button.textContent;
                    display.textContent = displayResult;
                }
                break;
            case "=":
                // consider if we should evaluate the expression and display the result
                if (isValid(exp)) {
                    display.textContent = evaluateExpression(exp);
                }
                break;
            default:
                // replace if previous input valus is ALSO a operator, else add to exp
                if (op.includes(exp[exp.length-1])) {
                    let temp = exp.slice(0,-1) + button.textContent;
                    exp = temp;
                }
                else {
                    updateExpression(button.textContent);
                }
                // update the exp, but don't display the evaluation result yet
                break;
        }
    }
    alert(exp);
}));


// *** Helper functions ***

// check whether the given input is digit
const isNumber = (str) => str.trim() != "" && !isNaN(Number(str));

// update the exp and display
const updateExpression = (userInput) => {
    exp = exp + userInput;
}

// check if given string is empty or undefined
const isEmpty = (str) => str === "" || typeof str === "undefined";

// extract operands and operators given the input
const processExpression = (exp) => {
  const match = exp.match(/^(.+?)([-+x÷])(.+)$/);
  if (match) {
    const [, operand1, operator, operand2] = match;
    return [operand1, operator, operand2];
  }
  return [];
}

// check if the given expression has 2 operands and 1 operator
const isValid = (exp) => (processExpression(exp)).length != 0;

// evalute the given expression
const evaluateExpression = (exp) => {
    let arr = processExpression(exp);
    let numberOne = Number(arr[0]);
    let numberTwo = Number(arr[2]);
    let operation = arr[1];
    return operate(operation, numberOne, numberTwo)
}

const updateDisplay = (str) => display.textContent = str;

// clear
const clearAll = () => {
    operand1 = "";
    operand2 = "";
    operator = "";
    result = null;
    hasSecondOperand = false;
    updateDisplay("0");
}
