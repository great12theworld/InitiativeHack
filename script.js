const input = document.getElementById('input');
const output = document.getElementById('output');

let currentInput = "";
const prompt = document.getElementById('prompt');

const filesystem = { //as it seems this is the filesystem.
    "/home/user" : ["Documents"],
    "/home/user/Documents": ["notes.txt"]
};
const files = {
    "/home/user/Documents/notes.txt" : "I dont remember creating this file.\n\n"+
    "This terminal has kept itself running..\n"+
    "The history is fresh but someone's been using the account.\n\n" +
    "There's something here.\n\n"+
    "- C"
}


let currentPath = "/home/user"; //initializes the start path


function getDirectory(path){
    if (filesystem[path] == undefined){
        return null;
    }
    return filesystem[path];
}
function getPrompt(){
    if (currentPath == "/home/user"){
        return "user@unknown:~$ "
    }
    if (currentPath.startsWith("/home/user/")){
        return "user@unknown:~/" + currentPath.slice("/home/user/".length) + "$ " //sets it up so that the prompt looks cooler
    }
    return "user@unknown:" + currentPath + "$ ";
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
        newLine.textContent = getPrompt() + command;

        output.appendChild(newLine);
        
        runCommand(command)
        
        currentInput = "";
        input.textContent="";
        prompt.textContent = getPrompt();

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
        // this entire segments below basically makes the commands work, this is probably all of them.
    if (cleanCommand == "ls"){
        const contents = getDirectory(currentPath);
        if (contents == null){
            printLine("ls: cannot access directory");
            return
        }
        printLine(contents.join("  "))
        return;
    }

    if (cleanCommand == "pwd"){
        printLine(currentPath);
        return;
    }

    if (cleanCommand.startsWith("cd")) {
        const destination = command.trim().slice(2).trim();
        if (destination == ""){
            currentPath = "/home/user";
            return;
        }
        let newPath;
        if (destination.startsWith("/")){
            newPath = destination;
        } else if (destination == ".."){
            newPath = "/home/user";
        } else {
            newPath = currentPath + "/" + destination;
        }

        if (getDirectory(newPath) == null){
            printLine("bash: cd: " + destination + " : No such directory");
            return;
        }
        currentPath = newPath; //changes current path to the new path
        return;
    }
    if(cleanCommand.startsWith("cat ")){
        const filename = command.trim().slice(4).trim();
        const filePath = currentPath + "/" + filename;

        if (files[filePath] == undefined){
            printLine("cat: " + filename + ": No such file");
            return;
        }
        printLine(files[filePath]);
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

