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
    operand1 = "";
    operand2 = "";
    operator = "";
    hasSecondOperand = false;
    result = null;
    display.textContent = "";
})

const backspaceButton = document.querySelector("#backspaceButton");
backspaceButton.addEventListener("click", function() {
    // clear the last digit entered
    let out = "";
    if (hasSecondOperand) {
        operand2 = operand2.slice(0,-1);
        out = operand2.length === 0 ? "0" : operand2;
    }
    else {
        operand1 = operand1.slice(0,-1);
        out = operand1.length === 0 ? "0" : operand1;
    }
    display.textContent = out;
})


const buttons = document.querySelectorAll(".cal");
buttons.forEach((button) => button.addEventListener("click", function() {
    const curInput = button.textContent;
    // current clicked or last clicked is a number, simply add to expression
    if (isNumber(curInput) || curInput === ".") {
        // first number
        if (operator === "") {
            // do nothing, if there's already a "."
            if (curInput === "." && operand1.includes(".")) return;
            operand1 = operand1 + curInput;
            updateDisplay(operand1);
        }
        // we expect second number
        else {
            hasSecondOperand = true;
            if (curInput === "." && operand2.includes(".")) return;
            operand2 = operand2 + curInput;
            updateDisplay(operand2);
        }
    }
    // we are dealing with other operator
    else if (op.includes(curInput)) {
        // we have what we need to evaluate
        if (operator != "" && operand2 != "") {
            result = operate(operator, Number(operand1), Number(operand2));
            terminate(result);
            operand1 = String(result); // update 
            operand2 = "";
            updateDisplay(operand1);
        }
        operator = curInput;
        hasSecondOperand = true;
    } else if (curInput === "=") {
        if (operand1 != "" && operator != "" && operand2 != "") {
            result = operate(operator, Number(operand1), Number(operand2));
            terminate(result);
            updateDisplay(result);
            // reset 
            operand1 = Str(result);
            operand2 = "";
            operator = "";
            hasSecondOperand = false;
        }
    }

}));


// *** Helper functions ***

// check whether the given input is digit
const isNumber = (str) => str.trim() != "" && !isNaN(Number(str));

const terminate = (re) => {if (re == null) return;}

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
