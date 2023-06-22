/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note:
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs
  Once you've implemented the logic, test your code by running
  - `npm run test-calculator`
*/
class Calculator {
    constructor() {
        this.result = 0;
    }

    add(number) {
        this.result += number;
    }

    subtract(number) {
        this.result -= number;
    }

    multiply(number) {
        this.result *= number;
    }

    divide(number) {
        this.result /= number;
    }

    clear() {
        this.result = 0;
    }

    getResult() {
        return this.result;
    }

    calculate(expression) {
        // Remove all spaces from the expression.
        expression = expression.replace(/ /g, "");

        // Parse the expression into an array of tokens.
        const tokens = expression.split("");

        // Check if the expression is valid.
        if (!isValidExpression(tokens)) {
            throw new Error("Invalid expression");
        }

        // Evaluate the expression.
        let result = 0;
        for (let i = 0; i < tokens.length; i++) {
            if (isOperator(tokens[i])) {
                const operator = tokens[i];
                const operand1 = result;
                const operand2 = parseFloat(tokens[i + 1]);
                result = evaluate(operator, operand1, operand2);
                i++;
            } else {
                result = parseFloat(tokens[i]);
            }
        }

        // Return the result.
        return result;
    }
}

function isValidExpression(tokens) {
    for (let i = 0; i < tokens.length; i++) {
        if (!isOperand(tokens[i]) && !isOperator(tokens[i])) {
            return false;
        }
    }
    return true;
}

function isOperand(token) {
    return /^[0-9]+$/.test(token);
}

function isOperator(token) {
    return token === "+" || token === "-" || token === "*" || token === "/";
}

function evaluate(operator, operand1, operand2) {
    switch (operator) {
        case "+":
            return operand1 + operand2;
        case "-":
            return operand1 - operand2;
        case "*":
            return operand1 * operand2;
        case "/":
            return operand1 / operand2;
        default:
            throw new Error("Invalid operator");
    }
}

// Test the code.
const calculator = new Calculator();

console.log(calculator.calculate("10 + 2 * (6 - (4 + 1) / 2) + 7")); // 25
console.log(calculator.calculate("5 + abc")); // Error: Invalid expression
