let addition = (operand1, operand2) => operand1 + operand2;
let subtraction = (operand1, operand2) => operand1 - operand2;
let multiplication = (operand1, operand2) => operand1 * operand2;
let division = (operand1, operand2) => operand1 / operand2;

let operand1;
let operand2;
let operator;


operate = (operator, operand1, operand2) => {
    switch (operator) {
        case "+": return addition(operand1, operand2);
        case "-": return subtraction(operand1, operand2);
        case "*": return multiplication(operand1, operand2);
        case "/": return division(operand1, operand2);
    }
}