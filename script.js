const buttons = document.querySelectorAll('button');
const resultParagraph = document.getElementById('result');
const inputField = document.getElementById('inputField');
const themeSelector = document.getElementById('theme');
let currentInput = '';
let result = 0;
let lastOperation = '';
let lastOperand = '';

function handleImplicitMultiplication(input) {
    return input.replace(/(\d)(\()/g, '$1*(').replace(/(\))(\d)/g, ')*$2');
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value >= '0' && value <= '9' || value === '.' || value === '(' || value === ')') {
            currentInput += value;
            inputField.value = currentInput;
        } else if (value === '+' || value === '-' || value === '*' || value === '/' || value === '%%') {
            if (value === '%%') {
                currentInput += ' % ';
            } else {
                currentInput += ` ${value} `;
            }
            inputField.value = currentInput;
            lastOperation = '';
        } else if (value === '%') {
            currentInput += ' / 100';
            inputField.value = currentInput;
        } else if (value === '=') {
            try {
                const processedInput = handleImplicitMultiplication(currentInput);
                result = eval(processedInput);
                resultParagraph.textContent = `Result: ${result}`;
                currentInput = result.toString();
                inputField.value = currentInput;
            } catch (error) {
                resultParagraph.textContent = 'Error';
                currentInput = '';
                inputField.value = '';
            }
        } else if (button.id === 'resetButton') {
            currentInput = '';
            result = 0;
            lastOperation = '';
            lastOperand = '';
            inputField.value = '';
            resultParagraph.textContent = 'Result: 0';
        } else if (button.id === 'backspaceButton') {
            currentInput = currentInput.slice(0, -1);
            inputField.value = currentInput;
        }
    });
});

// Add an event listener to the theme selector dropdown
themeSelector.addEventListener('change', (event) => {
    document.body.className = event.target.value; // Change the body class based on the selected theme
});

// Apply the saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    document.body.className = savedTheme;
    themeSelector.value = savedTheme;
});
