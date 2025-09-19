let operand1;
let operand2;
let operator;
let regex = /[-+x÷=\.]/;

// define basic operations
let addition = (operand1, operand2) => operand1 + operand2;
let subtraction = (operand1, operand2) => operand1 - operand2;
let multiplication = (operand1, operand2) => operand1 * operand2;
let division = (operand1, operand2) => operand1 / operand2;


operate = (operator, operand1, operand2) => {
    switch (operator) {
        case "+": return addition(operand1, operand2);
        case "-": return subtraction(operand1, operand2);
        case "x": return multiplication(operand1, operand2);
        case "÷": return division(operand1, operand2);
    }
}

// initialize the display to be 0
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

const buttons = document.querySelectorAll(".cal");
buttons.forEach((button) => button.addEventListener("click", function() {
    // refuse user input if it's NOT a digit and same as the previous enter value
    // i.e., multiple click of "." would only result in one "."
    
    

}));


// *** Helper functions ***

// check whether the given input is digit
const isDigit = (exp) => !regex.test(exp);

// evalute the given expression
function evaluateExpression(exp) {
    // numerics -> display it
    if (!regex.test(exp)) {
        display.textContent = exp;
    }
    // consider now we might need to evaluate the expression if there's 2 operands and 1 operator
    else {

    }
    
}

// evaluation the expression once "=" button is clicked
const evaluateButton = document.querySelector("#equal");
evaluateButton.addEventListener("click", function() {
    let operand1 = display.textContent.split(/([+\-*/])/)[0];
    let operand2 = display.textContent.split(/([+\-*/])/)[2];
    let operator = display.textContent.split(/([+\-*/])/)[1];
    if (operator === "/" && operand2 == "0") {
        display.textContent = "";
        alert("Division by zero error");
    }
    else {
         let result = operate(operator, Number(operand1), Number(operand2));
         display.textContent = result;
         compute = 1;
    }
});