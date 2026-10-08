const input = document.getElementById('input');
const output = document.getElementById('output');

let currentInput = "";

document.addEventListener('keydown', (event) => {
    if (event.key.length === 1) {
        currentInput += event.key;
        input.textContent = currentInput;
        event.preventDefault();
    }

    if (event.key === "Backspace"){
        currentInput = currentInput.slice(0,-1);
        input.textContent = currentInput;
        event.preventDefault();
    }
    if (event.key == "Enter"){
        const command = currentInput;
        const newLine = document.createElement("div");
        newLine.textContent = "C:\\>" + command;

        output.appendChild(newLine);

        currentInput = "";
        input.textContent="";

        event.preventDefault();
    }
});