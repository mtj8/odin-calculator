function operate(a, b, operation) {
    let result;
    switch (operation) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            if (b === 0) {
                return "good try buddy";
            }
            result = a / b;
            break;
    }
    return Number.isInteger(result) ? result : (result).toFixed(4);
}

// function to update current data and display
// only numbers are displayed on the board
function updateData (input) {
    currentData += input;
    currentData = parseInt(currentData);


    console.log(currentData);
    console.log(dataStack);

    displayData(currentData);
}

function clearData() {
    currentData = 0;
    dataStack = [];

    console.log(currentData);
    console.log(dataStack);

    displayData(currentData);
}

// attempt to push operation
function attemptOperation(input) {
    console.log(dataStack.length);
    // if stack length == 0, push the current number to the stack then the operation.
    if (dataStack.length == 0) {
        dataStack.push(currentData);
        currentData = 0;

        dataStack.push(input);
    }

    // if stack length == 1, it must be a number from attemptSolve, so clear and push
    else if (dataStack.length == 1) {
        // if the user has added some random numbers to the displayed number, update
        if (currentData != dataStack[0]) {
            dataStack[0] = currentData;
        }

        currentData = 0;
        dataStack.push(input);
    }

    // if stack length == 2, we only have a number and an operation, do nothing
    // if you want, make it so you just take whatever the current data is and do the operation already in there
    else if (dataStack.length == 2) {
        // do nothing lol
    }
    // if stack length == 3, we are full, so solve whatever's in there then push operation (length goes back to 2)
    else if (dataStack.length == 3) {
        let a = dataStack.shift();
        let b = dataStack.pop();
        let op = dataStack.shift();

        let ans = operate(a, b, op);
        dataStack.unshift(ans);
        dataStack.push(input);
    }

    console.log(currentData);
    console.log(dataStack);
}

function attemptSolve() {
    // if stack length == 2, solve and do necessary logic
    if (dataStack.length == 2) {
        dataStack.push(currentData);
        console.log(dataStack);

        let a = dataStack.shift();
        let b = dataStack.pop();
        let op = dataStack.shift();

        console.log(a, b, op);

        let ans = operate(a, b, op);
        console.log(ans);
        dataStack.unshift(ans);

        currentData = ans;
        displayData(ans);
    }

    // otherwise we not doing anything
}
// display function
function displayData(input) {
    display.textContent = input;
}

// ---------------------- code starts here

// get buttons (clear, number, operation, solve)
const display = document.querySelector(".calculator-display");
const inputNumbers = document.querySelectorAll(".inputs .number");
const inputOperations = document.querySelectorAll(".inputs .operation");
const inputDecimal = document.querySelectorAll(".inputs .decimal");
const solveButton = document.querySelector(".solve");
const clearButton = document.querySelector(".clear");

// add on click event listeners to each type of button
Array.from(inputNumbers).forEach(element => {
    element.addEventListener("click", function () {
        updateData(element.textContent);
    });
});

Array.from(inputOperations).forEach(element => {
    element.addEventListener("click", function () {
        attemptOperation(element.textContent);
    });
});

solveButton.addEventListener("click", function () {
    attemptSolve();
});

clearButton.addEventListener("click", function () {
    clearData();
});

// variables to save numbers and operations
// when number / operation complete, push to an array
// this array automatically operates when the length of the array is 3 and another operation is pushed or if the equals button is pressed
// these are the main variables used by the program to hold data. should they be in global scope? idk
let currentData;
let dataStack;
clearData();

