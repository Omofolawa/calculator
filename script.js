const buttons = document.querySelectorAll('button');
const resultParagraph = document.getElementById('result');
const inputField = document.getElementById('inputField');
const themeSelector = document.getElementById('theme');
let currentInput = '';
let result = 0;

function handleImplicitMultiplication(input) {
    return input.replace(/(\d)(\()/g, '$1*(').replace(/(\))(\d)/g, ')*$2');
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value >= '0' && value <= '9' || value === '.' || value === '(' || value === ')') {
            currentInput += value;
            inputField.value = currentInput;
        } else if (value === '+' || value === '-' || value === '*' || value === '%' || value === '/') {
            currentInput += ` ${value} `;
            inputField.value = currentInput;
        } else if (value === '=') {
            try {
                const processedInput = handleImplicitMultiplication(currentInput.replace('%', '/100*'));
                result = eval(processedInput);
                resultParagraph.textContent = `Result: ${result}`;
                currentInput = result.toString();
                inputField.value = currentInput;
            } catch (error) {
                resultParagraph.textContent = 'Error';
                currentInput = '';
            }
        } else if (button.id === 'resetButton') {
            currentInput = '';
            result = 0;
            inputField.value = '';
            resultParagraph.textContent = 'Result: 0';
        }
    });
});

// Add an event listener to the theme selector dropdown
themeSelector.addEventListener('change', (event) => {
    document.body.className = event.target.value; // Change the body class based on the selected theme
}
);