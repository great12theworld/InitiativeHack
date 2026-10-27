const input = document.getElementById('input');
const output = document.getElementById('output');

let currentInput = "";
const prompt = document.getElementById('prompt');

const filesystem = { //as it seems this is the filesystem.
    "/home/user" : ["Documents",".system"],
    "/home/user/Documents": ["notes.txt"],
    "/home/user/.system" : ["access.log", "session.txt"]
};
const files = {
    "/home/user/Documents/notes.txt" : 
        "I dont remember creating this file.\n\n"+
        "This terminal has kept itself running..\n"+
        "The history is fresh but someone's been using the account.\n\n" +
        "There's something here.\n\n"+
        "- C",
    "/home/user/.system/access.log" :
        "3:14:09 - session started\n"+
        "3:14:12 - user authentication bypassed\n" +
        "3:14:15 - WARNING: unknown user detected\n" +
        "3:14:19 - unknown user connected\n" +
        "3:14:19 - Restore utility available\n" + 
        "3:14:19 - Note: Where did you locate this terminal? 7 Letters, a ghost\n",

    "/home/user/.system/session.txt" :
        "SESSION RECORD\n\n"+
        "Particpant: [REDACTED]\n" +
        "Trial: 07\n" +
        "Status: INCOMPLETE",
}
const lockedFiles = {
    "/home/user/.system/session.txt" : "PHANTOM"
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
    if (cleanCommand == "ls" || cleanCommand == "ls -a"){
        const contents = getDirectory(currentPath);
        if (contents == null){
            printLine("ls: cannot access directory");
            return;
        }
        if (cleanCommand == "ls"){
            printLine(contents.filter(name => !name.startsWith(".")).join("  "))
        } else{
            printLine(".  ..  " + contents.join("  "))
        }
        return;
    }

    if (cleanCommand == "pwd"){ //this.. prints the directory.. pls tell me you knew this
        printLine(currentPath);
        return;
    }

    if (cleanCommand.startsWith("cd")) {
        const destination = command.trim().slice(2).trim(); //takes out the cd part of it giving just file destination
        if (destination == ""){
            currentPath = "/home/user";
            return;
        }
        let newPath;
        if (destination.startsWith("/")){
            newPath = destination;
        } else if (destination == ".."){ //going back command
            newPath = "/home/user";
        } else {
            newPath = currentPath + "/" + destination;
        }

        if (getDirectory(newPath) == null){
            printLine("bash: cd: " + destination + " : No such directory");
            return;
        }
        currentPath = newPath; //changes current path to the new path after running cd
        return;
    }
    if(cleanCommand.startsWith("cat ")){
        const filename = command.trim().slice(4).trim(); //same thing as destination basically, cuts out the "cat " and puts it in a local constant
        const filePath = currentPath + "/" + filename;

        if (files[filePath] == undefined){ //if no file in everything after "cat " from files[whatever it is]
            printLine("cat: " + filename + ": No such file");
            return;
        }
        
        if (lockedFiles[filePath] !== undefined) {
            printLine("cat: " + filename + ": Permission denied");
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

