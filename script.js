const input = document.getElementById('input');
const output = document.getElementById('output');

let currentInput = "";

const filesystem = {
    "/home/user" : ["Documents"],
    "/home/user/Documents": []
};

let currentPath = "/home/user";


function getDirectory(path){
    
}

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
        newLine.textContent = "user@unknown:~$ " + command;

        output.appendChild(newLine);
        
        runCommand(command)

        currentInput = "";
        input.textContent="";

        event.preventDefault();
    }
});

function printLine(text){
    const newLine = document.createElement("div");
    newLine.textContent = text;
    output.appendChild(newLine);
}

function runCommand(command){
    const cleanCommand = command.trim().toLowerCase(); //makes it clean, get it, get it? its funny

    if (cleanCommand == "ls"){
        printLine("Desktop  Documents  Downloads  Pictures")
        return;
    }

    if (cleanCommand == "pwd"){
        printLine("/home/user");
        return;
    }
    if (cleanCommand == "whoami"){
        printLine("user");
        return;
    }
    if (cleanCommand == "uname"){
        printLine("Linux");
        return;
    }
    if (cleanCommand === "clear"){
        output.innerHTML = "";

        return;
    }

    printLine("bash: " + command + " command not found");
}

