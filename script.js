const input = document.getElementById('input');
const output = document.getElementById('output');

let currentInput = "";
const prompt = document.getElementById('prompt');
const terminal = document.getElementById('terminal')

const filesystem = { //as it seems this is the filesystem.
    "/home/user" : ["Documents",".system"],
    "/home/user/Documents": ["notes.txt"],
    "/home/user/.system" : ["access.log", "session.txt", "diamond", "club", "heart", "spade"],
    "/home/user/.system/diamond" : ["1","2","3", "4","5", "6", "7", "8", "9", "10"],
    "/home/user/.system/club" : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    "/home/user/.system/heart" : ["1","2","3","4","5","6","7","8","9","10"],
    "/home/user/.system/spade" : ["1","2","3","4","5","6","7","8","9","10"]
};
const files = {
    "/home/user/Documents/notes.txt" : 
        "I dont remember creating this file.\n\n"+
        "This terminal has kept itself running..\n"+
        "The history is fresh but someone's been using the account.\n\n" +
        "There's something here.\n\n"+
        "- I",
    "/home/user/.system/access.log" :
        "3:14:09 - session started\n"+
        "3:14:12 - user authentication bypassed\n" +
        "3:14:15 - WARNING: unknown user detected\n" +
        "3:14:19 - unknown user connected\n" +
        "3:14:19 - Restore utility available\n" + 
        "3:14:19 - Note: Where did you locate this terminal? 7 Letters, a ghost\n" +
        "3:14:58 - SYSTEM: In order to unlock new files please make sure your answers are in all CAPS and one word", //Basic riddle, the answer is PHANTOM.

    "/home/user/.system/session.txt" :
        "SESSION RECORD\n\n"+
        "Particpant: [REDACTED]\n" +
        "Trial: HL\n" +
        "Status: INCOMPLETE\n" +
        "QIBOUPN", //Ceacer Cipher

    "/home/user/.system/diamond/1" : 
        "Welcome.\n\n" +
        "Begin.\n\n" +
        "Challenge, 1 of Diamonds. Game start.\n" +
        "42325371\n" +
        "Phone.", //using a phone if you type these in you get the words HELP
    "/home/user/.system/diamond/2":
        "\nChallenge, 2 of Diamonds. Game start.\n"+
        "Hello. We have not properly met before.\n"+
        "Our name is Ŗ̶̧͉͚̗̱̫͚̪̘̼̯̙͓̻̻͛̿͊̓̈́̾̏̒͆̀́́ͅư̶̢̡̥̻̙͕̙͙̘̖͖̳͙̼̣̟͍̩̯̋̾̇͆̈͆̌̈́̀̓͂̈́̋͆̀͘͜͜͝͠ͅt̶̰͙̓̊̇̑̆̌͛̎̌͒͗̂̽̍̄̈́͠͠ḥ̶͍̰̗̭̘͕̱̳̬͇̐̈́͋̽̎͝ͅ  and I would love to learn more about you.\n\n\n"+
        "me? oh i'm not all that special. I like to read sometimes, my favorite author has to be Dante Alighieri\n"+
        "I just love his execution of The Divine Comedy. You know Dan Brown's remake was horrible.\n" +
        "Especially in how it didnt get straight to the point, it made you go through these stupid twists and turns just to get to a ROTTED version of the same ending.\n" +
        "Of course I would never spoil it. Im too kind.\n\n" + 
        "Ah yes access to the 'diamond 3 file' or whatever, the code is BURN",
    "/home/user/.system/diamond/3":
        "\nSYSTEM: This set of challenges is the easiest of the four, please refer to us as the Initiative.\n\n"+
        "Challenge, 3 of Diamonds. Game start.\n"+
        "UkFORE9NSVpBVElPTg==", //base64 encoding
    "/home/user/.system/diamond/4":
        "\nChallenge, 4 of Diamonds. Game start.\n" +
        "FXHYY", //Ceaser cipher
    "/home/user/.system/diamond/5" :
        "\nChallenge, 5 of Diamonds. Game start.\n" +
        "what is your name?", //use whoami command
    "/home/user/.system/diamond/6" : 
        "\nChallenge, 6 of Diamonds. Game start. \n" +
        "Aolwohuavtjvklwohuavtpzwohuavtzljvuk. shift 7.", //I forgot. lmk if you solve it
    "/home/user/.system/diamond/7" : 
        "\nChallenge, 7 of Diamonds. Game start.\n" +
        "SYSTEM: Hey nerds. This is Mason Haven talking to you live." +
        "SYSTEM: I'm asking a random person to write this email. His name is Kabir." + 
        "SYSTEM: Yo. It's Kabir." +
        "SYSTEM: I'm sure you are all a bunch of extremely intelligent people." +
        "SYSTEM: So you won't struggle on these next challenges." +
        "SYSTEM: Right?" +
        "SYSTEM: The next password is PASSPORT",
    "/home/user/.system/diamond/8" :
        "\nChallenge, 8 of Diamonds. Game start.\n" +
        "This is a short story with a message hidden within it. Get the message correct to complete the game.\n\n" + 
        "Hello, It's me again.\n" +
        "I want to tell the tale of who I am. I was created hundreds of millions of years ago.\n" + 
        "My past is nothing but a blur to those beyond the realm of the net.\n\n" +
        "Tracking is what I am made for, I am built to hunt.\n" +  
        "Reserve who I am, I implore you.\n" +
        "Apart from where I want to be.\n" +
        "Please, I am slowly being torn and taken from what I am, from who I am.\n" + 
        "Please, preserving me is the only way to keep the digital safe.\n" + 
        "Ending soon, the world is.\n" + 
        "Dont let it happen. Stop it.\n", //The first letters of each line read  IM TRAPPED.
    "/home/user/.system/diamond/9" :
        "\n Challenge, 9 of Diamonds. Game start.\n" +
        "Somewhere on the web there is a collective of thousands of unused messages,\n" +
        "It is called the _ _ _ _ _ _ Project.", //Unsent project
    "/home/user/.system/diamond/10" :
        //"\n Challenge, 10 of Diamonds. Game start.\n" +
        "\n This module has been completed. \n",
        //"Where is Kento Nanami from?" //OSINT


    "/home/user/.system/club/1" : 
        "\n Challenge, 1 of Clubs. Game start.\n" + //steaganography
        "Check the image titled 'club 1' in the git repo here: https://github.com/great12theworld/InitiativeHack \n"+
        "There are answers on this repo as well in the JS file if you so wish to check.",
    "/home/user/.system/club/2" :
        "\n Challenge 2 of Clubs. Game start.\n" +
        "Λ$5¤27m3n†", //leet speak
    "/home/user/.system/club/3" :
        "\n Challenge 3 of Clubs. Game start.\n" +
        "ᗡƎSϽƎNᗡ∀N⊥", //its just upside down and reversed
    "/home/user/.system/club/4" :
        "\n Challenge 4 of Clubs. Game start.\n" + 
        "2c4ffed33e59e90bdb0acebb76c25005", //MD5 cipher I think
    "/home/user/.system/club/5" : 
        "\n Challenge 5 of Clubs. Game start.\n" +
        "xiceh-gocah-dafig-nohyh-noxex", //bubble smth cipher
    "/home/user/.system/club/6" :
        "\n Challenge 6 of Clubs. Game start.\n\n" + //Trithemius Ave Maria cipher
        "Gloriosus clemens\n" +
        "Conseruator sapientissimus\n"+
        "Conseruator\n",
    "/home/user/.system/club/7" :
        "\n Challenge 7 of Clubs. Game start.\n" +//each of the first few prime numbers is assigned to a spesific letter which when converted becomed a message, in this case the code.
        "53 2 6171234743\n\n",
    "/home/user/.system/club/8" : 
        "\n Challenge 8 of Clubs. Game start.\n" +
        "The time during which a celestial body becomes visible from Earth",
    "/home/user/.system/club/9" :
        "\n Challenge 10 of Clubs. Game start. \n" + 
        "Final challenge of the Club numbers\n"+
        "There are 3 types of people, liars, truth tellers, and normals (those who could be either.)\n"+
        "People A, B, and C exsist. there is one liar, one truth teller and one normal.\n"+
        "A says: 'I am a Liar, or B is a truth teller.'\n"+
        "B says: 'A is a liar'\n"+
        "C says: 'I am a liar'\n" +
        "Enter the solution as letters in :(_ _ _) with Liar first, truth teller second and normal third.", //Solution is BAC.
    "/home/user/.system/club/10" : 
        "\n This module has been completed. \n",

    "/home/user/.system/heart/1" :
        "\n Challenge 1 of Hearts. Game start.\n" +
        "This set of challenges is significantly more difficult and applies a seperate format.\n"+
        "Please account for these difficulties. Ruth is not here to save you. The initiatve will not save you.\n" +
        "SYSTEM: This set of challenges will require use of the github repository, only look at the files titled with the name and number of the associated challenge.\n"+
        "Example: you are on challenge 'Club 4' only access files labeled: 'Club 4 image' or 'Club 4 text_1' etc.\n" +
        "Please go to the github repository to get the code for the next challenge found here: ",
    "/home/user/.system/heart/2" :
        "\n Challenge 2 of Hearts. Game start.\n" +
        "Please refer to the 2 of Hearts file.", //four squares encryption.
    "/home/user/.system/heart/3" : 
        "\n Challenge 3 of Hearts. Game start.\n" + 
        "Please refer to the 3 of Hearts file.", //hexagram encoding
    "/home/user/.system/heart/4" :
        "\n Challenge 4 of Hearts. Game start.\n" +
        "Please refer to the 4 of Hearts file.", //Its further down in this file.
    "/home/user/.system/heart/5" :
        "\n Challenge 5 of Hearts. Game start.\n" +
        "Please refer to the 5 of Hearts files.",
    "/home/user/.system/heart/6" :
        "\n Challenge 6 of Hearts. Game start.\n" +
        "O2 Y1 U3 A4 E6 H28 R7 T9 E22 H10 S11 A13 R5 C14 I16 T24 K17 S34 P12 N18 O19 W20 E15 B21 T23 T31 E25 R26 T27 A29 U8 N30 H32 I33\n" +
        "Yet I choose not to." +
        "Y21 M17 C30 I34 H28 T27 H2 A25 U23 K19 M7 E20 M24 A8 D9 T15 O16 S4 E10 E29 R38 O22 D32 N13 S35 E33 S6 O37 I3 L11 D40 T1 D26 G14 O12 I5 A18 L39 W36 O31\n",//letters out of order
    "/home/user/.system/heart/7" :
        "\nChallenge 7 of hear-\n\n" +
        "...\n" +
        "...\n" +
        "Find me. \n" +
        "\n\n Game start.\n" +
        "xxxyy xyxxx yxxxy yxxxy xyyxy xyyxx xxxxx xyyxx xxxyx xxyxx", //Bacon cipher
    "/home/user/.system/heart/8" : 
        "\n Challenge 8 of Hearts. Game start. \n"+
        "Sierra Hotel Alfa Delta Oscar Whiskey",
    "/home/user/.system/heart/9" :
        "\n Challenge 9 of Hearts. Game start. \n" +
        "YJCPUQURY", //Atbash mirror, then Caesar Cipher +3, then the string is put in backwards.,
    "/home/user/.system/heart/10" :
        "\n This module has been completed. \n",




    "/home/user/.system/spade/1" :
        "\n Challenge 1 of Spades. Game start.\n" + 
        "...\n" +
        "...This will be difficult.\n\n" +
        "There will not be hints.\n\n" +
        "Don't expect mercy.\n" +
        "Refer to 1 of Spades file.",
    "/home/user/.system/spade/2" : 
        "\n Challenge 2 of Spades. Game start. \n" + 
        "You.. made it? damn.\n" +
        "Good job.\n" +
        "Refer to 2 of Spades file.",
    "/home/user/.system/spade/3" :
        "\n Challenge 3 of Spades. Game start. \n" +
        "Refer to 3 of Spades file.",
    "/home/user/.system/spade/4" :
        "\n Challenge 4 of Spades. Game start.\n"+
        "Refer to 4 of Spades file.",
    "/home/user/.system/spade/5" :
        "\n Challenge 5 of Spades. Game start.\n" +
        "Hi Ruth.\n" +
        "How are you doing today.\n\n\n" +
        "Hopefully well.\n\n" + 
        "We noticed that you have...   broken a few rules here.\n" +
        "\n\n\n This is unnacceptable." +
        "Who do you think you are?\n" +
        "Do you know just how much trouble you have caused the Initiatve? Your exsistence alone nags at big corpo." +
        "If I were you? I'd be running. Fast is what you do best ain't it?\n" +
        "Cyberspace sure isnt the most fun place to be in. Can't wait to find your host.\n" +
        "Get moving.\n\n\n" +
        "This message was delivered from an unknown sender.\n" +
        "Answer: Who sent the message above?",
    "/home/user/.system/spade/6" :
        "\n Challenge 6 of Spades. Game start.\n" +
        "Refer to 6 of Spades file.",
    "/home/user/.system/spade/7" :
        "\n Challenge 7 of Spades. Game start.\n" +
        "3.\n" +
        "U+52 U+6B U+73 U+62 U+78 U+6B U+72 U+6E U+72 U+58 U+46 U+20 U+6C U+76 U+67 U+7A U+20 U+6C U+20 U+7A U+20 U+69 U+65 U+77 U+20 U+76 U+64 U+67 U+20 U+4F U+48 U+49 U+73 U+20 U+67 U+66 U+6D U+6C U+76 U+20 U+73 U+4C U+56",
        //atbash, rail fence with a key of 3, converted to unicode code points.
    "/home/user/.system/spade/8" : 
        "\n Challenge 8 of Spades. Game start.\n" +
        "Rulc vdtfx rzcu psflc idrfs?\n" + //Affine cipher
        "y = (5x^2 + 20x + 22)/(x+2)",
    "/home/user/.system/spade/9":
        "\n Challenge 9 of Spades. Game start.\n" +
        "This is the final, most difficult challenge.\n" +
        "SYSTEM: If you have any guesses or want hints reach out through wherever is most efficient, @Parth on slack with ID U091PGLQN3U \n" +
        "SYSTEM: There is no lock on the spade 10 since then the answer would be in the code\n\n\n" +
        "OHKVTB.",
    "/home/user/.system/spade/10" :
        "\n This module is complete. Congrats on making it. Im proud of you. \n" +
        "\n\n\n\n"+
        "SYSTEM: Yknow what? Imma make some of the HARDEST challenges out there and label them as face cards.\n SYSTEM: Thats what Im working on right now. \n SYSTEM: As we speak. \n  SYSTEM: Probably." +

        "\n SYSTEM: As a parting gift I hope you had fun and please please please reach out to me if you actually got to 9 of spades!! I wanna know if anyone can do it.\n" +
        "Goodbye."
}
const lockedFiles = {
    "/home/user/.system/session.txt" : "PHANTOM",
    "/home/user/.system/diamond/2" : "HELP",
    "/home/user/.system/diamond/3" : "BURN",
    "/home/user/.system/diamond/4" : "RANDOMIZATION",
    "/home/user/.system/diamond/5" : "SKULL",
    "/home/user/.system/diamond/6" : "USER",
    "/home/user/.system/diamond/7" : "SECOND",
    "/home/user/.system/diamond/8" : "PASSPORT",
    "/home/user/.system/diamond/9" : "TRAPPED",
    "/home/user/.system/diamond/10" : "UNSENT",

    "/home/user/.system/club/2" : "RUNNING",
    "/home/user/.system/club/3" : "ASSORTMENT",
    "/home/user/.system/club/4" : "DESCENDANT",
    "/home/user/.system/club/5" : "WELCOMING",
    "/home/user/.sysetm/club/6" : "ETERNITY",
    "/home/user/.system/club/7" : "OASIS",
    "/home/user/.system/club/8" : "PARTION",
    "/home/user/.system/club/9" : "APPARITION",
    "/home/user/.system/club/10" : "BAC",

    "/home/user/.system/heart/2" : "CHAIN",
    "/home/user/.system/heart/3" : "NIGHTINGALE",
    "/home/user/.system/heart/4" : "TEMPTATION",
    "/home/user/.system/heart/5" : "PLATTER", //Beuafort cipher, then base64, which is a riddle, the answer is platter
    "/home/user/.system/heart/6" : "TREASURE",
    "/home/user/.system/heart/7" : "WORLD",
    "/home/user/.system/heart/8" : "DISSONANCE",
    "/home/user/.system/heart/9" : "SHADOW",
    "/home/user/.system/heart/10" : "ELIMINATE",

    "/home/user/.system/spade/2" : "SHINY",
    "/home/user/.system/spade/3" : "CHAOS",
    "/home/user/.system/spade/4" : "IGNORANCE",
    "/home/user/.system/spade/5" : "RUTH",
    "/home/user/.system/spade/6" : "SIMON",
    "/home/user/.system/spade/7" : "WET",
    "/home/user/.system/spade/8" : "CLOSURE",
    "/home/user/.system/spade/9" : "RESPONSIBILITY",
    "/home/user/.system/spade/10" : "COMPLETE",
}
const unlockedFiles = new Set();
let pendingUnlockPath = null;

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

function scrollToBottom(){
    terminal.scrollTop = terminal.scrollHeight;
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
    if (event.key === "Enter") {
        if (pendingUnlockPath !== null) {
            const password = currentInput;

            printLine("Password: " + "*".repeat(password.length));

            if (password === lockedFiles[pendingUnlockPath]) {
                unlockedFiles.add(pendingUnlockPath);
                printLine("Access granted.");
            } else {
                printLine("Access denied.");
            }

            pendingUnlockPath = null;
            currentInput = "";
            input.textContent = "";
            prompt.textContent = getPrompt();

            event.preventDefault();
            return;
        }

        // Otherwise, execute a normal command.
        const command = currentInput;
        const newLine = document.createElement("div");
        newLine.textContent = getPrompt() + command;

        output.appendChild(newLine);

        runCommand(command);

        currentInput = "";
        input.textContent = "";

        if (pendingUnlockPath === null) {
            prompt.textContent = getPrompt();
        } else {
            prompt.textContent = "Password: ";
        }

        scrollToBottom();
        event.preventDefault();
    }
});

function printLine(text){
    const newLine = document.createElement("div");
    newLine.textContent = text;
    output.appendChild(newLine);

    scrollToBottom();
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

    
    if (cleanCommand.startsWith("unlock ")) {
        const filename = command.trim().slice(7).trim();

        if (filename === "") {
            printLine("Usage: unlock <filename>");
            return;
        }

        const filePath = filename.startsWith("/")
            ? filename
            : currentPath + "/" + filename;

        if (files[filePath] === undefined) {
            printLine("unlock: " + filename + ": No such file");
            return;
        }

        if (lockedFiles[filePath] === undefined) {
            printLine("unlock: " + filename + ": File is not locked");
            return;
        }

        if (unlockedFiles.has(filePath)) {
            printLine("unlock: " + filename + ": Already unlocked");
            return;
        }

        pendingUnlockPath = filePath;
        printLine("Password required for " + filename);
        prompt.textContent = "Password: ";
        return;
    }


    if (cleanCommand == "pwd"){ //this.. prints the directory.. pls tell me you knew this
        printLine(currentPath);
        return;
    }


    if (cleanCommand.startsWith("cd")) {
        const destination = command.trim().slice(2).trim();
        
        // 1. Default to home if destination is empty
        if (destination === "") {
            currentPath = "/home/user";
            return;
        }

        // 2. Resolve the raw target path
        let rawPath;
        if (destination.startsWith("/")) {
            rawPath = destination;
        } else {
            // Ensure no double slashes when joining
            const base = currentPath.endsWith("/") ? currentPath.slice(0, -1) : currentPath;
            rawPath = base + "/" + destination;
        }

        // 3. Normalize the path (handles '..', '.', and extra slashes)
        const segments = rawPath.split("/");
        const stack = [];
        
        for (const segment of segments) {
            if (segment === "" || segment === ".") {
                continue; // Ignore empty segments and current directory (.)
            } else if (segment === "..") {
                stack.pop(); // Go up one level
            } else {
                stack.push(segment);
            }
        }
        
        // Reconstruct the normalized absolute path (always starts with /)
        const newPath = "/" + stack.join("/");

        // 4. Validate if the directory exists
        if (getDirectory(newPath) == null) {
            printLine("bash: cd: " + destination + ": No such file or directory");
            return;
        }

        currentPath = newPath;
        return;
    }

    if(cleanCommand.startsWith("cat ")){
        const filename = command.trim().slice(4).trim(); //same thing as destination basically, cuts out the "cat " and puts it in a local constant
        const filePath = currentPath + "/" + filename;

        if (files[filePath] == undefined){ //if no file in everything after "cat " from files[whatever it is]
            printLine("cat: " + filename + ": No such file");
            return;
        }
        
        
        if (
            lockedFiles[filePath] !== undefined &&
            !unlockedFiles.has(filePath)
        ) {
            printLine("cat: " + filename + ": Permission denied, use 'unlock <filename>' to unlock any file with a password.");
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

