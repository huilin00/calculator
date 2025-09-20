let operand1;
let operand2;
let operator;
let op = ["-", "+", "x", "÷"];


// define basic operations
let addition = (operand1, operand2) => operand1 + operand2;
let subtraction = (operand1, operand2) => operand1 - operand2;
let multiplication = (operand1, operand2) => operand1 * operand2;
let division = (operand1, operand2) => {
    if (operand2 === 0) {
        alert("Division by Zero Error!")
    }
    else {
        operand1 / operand2;
    }
}



operate = (operator, operand1, operand2) => {
    switch (operator) {
        case "+": return addition(operand1, operand2);
        case "-": return subtraction(operand1, operand2);
        case "x": return multiplication(operand1, operand2);
        case "÷": return division(operand1, operand2);
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
let exp = "";
const buttons = document.querySelectorAll(".cal");
buttons.forEach((button) => button.addEventListener("click", function() {
    // current clicked or last clicked is a number, simply add to expression
    if (isNumber(button.textContent)) {
        update(button.textContent);
    }
    else {
        switch (button.textContent) {
            case ".":
                // only allowed "." if the last enter value is NOT "."
                if (exp[exp.length-1] != ".") {
                    update(button.textContent);
                }
                break;
            case "=":
                // consider if we should evaluate the expression and display the result
                if (isValid(exp)) {
                    alert("We are ready to evaluate!")
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
                    update(button.textContent);
                }
                break;
        }
    }
    alert(exp);
}));


// *** Helper functions ***

// check whether the given input is digit
const isNumber = (str) => str.trim() != "" && !isNaN(Number(str));

// update the exp and display
const update = (userInput) => {
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
function evaluateExpression(exp) {
    let arr = processExpression(exp);
    let numberOne = Number(arr[0]);
    let numberTwo = Number(arr[2]);
    let operation = arr[1];
    return operate(operation, numberOne, numberTwo)
}

// evaluation the expression once "=" button is clicked
// const evaluateButton = document.querySelector("#equal");
// evaluateButton.addEventListener("click", function() {
//     let operand1 = display.textContent.split(/([+\-*/])/)[0];
//     let operand2 = display.textContent.split(/([+\-*/])/)[2];
//     let operator = display.textContent.split(/([+\-*/])/)[1];
//     if (operator === "/" && operand2 == "0") {
//         display.textContent = "";
//         alert("Division by zero error");
//     }
//     else {
//          let result = operate(operator, Number(operand1), Number(operand2));
//          display.textContent = result;
//          compute = 1;
//     }
// });