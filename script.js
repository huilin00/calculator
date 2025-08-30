let addition = (operand1, operand2) => operand1 + operand2;
let subtraction = (operand1, operand2) => operand1 - operand2;
let multiplication = (operand1, operand2) => operand1 * operand2;
let division = (operand1, operand2) => operand1 / operand2;

let operand1;
let operand2;
let operator;
let compute = 0;


operate = (operator, operand1, operand2) => {
    switch (operator) {
        case "+": return addition(operand1, operand2);
        case "-": return subtraction(operand1, operand2);
        case "x": return multiplication(operand1, operand2);
        case "/": return division(operand1, operand2);
    }
}

const display = document.querySelector(".display");
const clearButton = document.querySelector("#clearButton");
clearButton.addEventListener("click", function(){
    display.textContent = "";
})

const backspaceButton = document.querySelector("#backspaceButton");
backspaceButton.addEventListener("click", function() {
    display.textContent = display.textContent.slice(0, -1);
})

const buttons = document.querySelectorAll(".cal");
buttons.forEach((button) => button.addEventListener("click", function() {
    if (compute === 1) {
        display.textContent = "";
        compute = 0; 
    }
    else {
        // only consider the last operator
        if (button.className === "cal operator") {
            if (display.textContent.includes('+') || display.textContent.includes('-') || display.textContent.includes('*') || display.textContent.includes('/')) {
                display.textContent = display.textContent.replace(/[+-/*]/, button.textContent);
            }
            else {
                display.textContent += button.textContent;
            }
        } else if (button.id === "decimal") {
            if (display.textContent.includes('.')) {
                display.textContent = display.textContent;
             }
            else {
                display.textContent += button.textContent;
            }
        }
        else {
            display.textContent += button.textContent;
        }
    }
}));

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