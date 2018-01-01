const WORDS = [
    {name:"bang",description:"The logical 'not' operator. Placed in front of a boolean value it will reverse the value, returning the opposite."},
    {name:"braces",description:"The curly brackets are used to define the start and end of the function, they also separate code into blocks within the function."},
    {name:"less",description:"The less than operator does as it is expected, it compares to values and returns true or false"},
    {name:"greater",description:"The less than operator does as it is expected, it compares values and returns true or false"},
    {name:"objects",description:"Understanding objects in javascript is critical because **almost** everything is an object! Objects consist of name:value pairs"},
    {name:"brackets",description:"Brackets are used in various ways, including accessing the properties of an Object/Array and enclosing array values."}
    ];
const IMG = ["1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png","10.png","11.png",];
let user = {name:"",losses:0,wins:0}
let userName = prompt("What's your name?");
user.name = userName;
let wrong = 0;
let wordNum = Math.floor(Math.random() * WORDS.length);
let currentWord = WORDS[wordNum].name;
let currentDescription = WORDS[wordNum].description;
let numOfGuesses = 0;
let lettersGuessed = [];
let characters=[];
let choice = false;
let workingName = "";
let blankCharacters = [];
let newGame = false;
let checkName = "";
//Need to keep track of which words are done
let finishedWords = [];

//Checks to see if the word has been previously used
function checkArray(checkName){
    let wordVal = false;
    let answer = "";
    let searchArray = [];
    if(checkName >= 0 && wordVal == false){
        wordNum = Math.floor(Math.random() * WORDS.length);
        currentWord = WORDS[wordNum].name;
        checkName = finishedWords.indexOf(currentWord);
        if(checkName == -1){
            answer = "yes";
            searchArray.push(wordVal);
           }else{
               answer = "no";
               searchArray.push(wordVal);
           }
    }
    for(let i= 0; i < searchArray.length; i++){
        let a = searchArray.indexOf("yes");
        if(a){
            wordVal = true;
        }
    }
    return wordVal;
}

//Begins Game
function start(){
    wordNum = Math.floor(Math.random() * WORDS.length);
    currentWord = WORDS[wordNum].name;
    checkName = finishedWords.indexOf(currentWord);
    let result = checkArray(checkName);
    if(result == true){
        currentDescription = WORDS[wordNum].description;
        lettersGuessed = [];
        wrong = 0;
        document.getElementById("hangTheMan").src = `assets/images/1.png`;
        start();
    }else{
        lettersGuessed = [];
        wrong = 0;
        if(newGame === true){
            user.wins = 0;
            user.losses = 0;
        }
        document.getElementById("lettersGuessed").style.visibility = "visible";
        document.getElementById("lettersGuessed").innerHTML = "Letters Guessed: "
        document.getElementById("currentWordSpots").innerHTML ="";
        document.getElementById("wins").innerHTML = `Wins<br>${user.wins}`;
        document.getElementById("losses").innerHTML = `Losses<br>${user.losses}`;
        blankCharacters = [];
        currentWord = WORDS[wordNum].name;
        workingName = currentWord;
        //Will need characters of the current word for blank spaces and to compare
        characters = currentWord.split("");
        if(currentWord.length > 0){
            characters.map((x)=>{
            blankCharacters.push(" _ ")
        })
            for(let i=0;i<blankCharacters.length;i++){
            document.getElementById("currentWordSpots").innerHTML += `${blankCharacters[i]}`;
            }
        }
    }
newGame = false;
}

//function for populating results to DOM
function populateDiv(){
    //Writes the empty spaces to DOM
    if(currentWord.length > 0){
        document.getElementById("currentWordSpots").innerHTML = "";
        for(let i=0;i<blankCharacters.length;i++){
            document.getElementById("currentWordSpots").innerHTML += `${blankCharacters[i]}`;
        }
        //writing to console for testing
        console.log(currentWord);
    }else{
        user.wins++;
        document.getElementById("info").innerHTML = `<span class="word-name">${WORDS[wordNum].name}:</span> ${WORDS[wordNum].description}`;
        document.getElementById("lettersGuessed").innerHTML ="";
        document.getElementById("start").innerText = "Play Again";
        document.getElementById("wins").innerHTML = `Wins<br>${user.wins}`;
        document.getElementById("hangTheMan").src = `assets/images/1.png`;
        document.getElementById("currentWordSpots").innerHTML = `The word was ${workingName}`;
        finishedWords.push(workingName);
        //Checks to see if game play has reached max amount of words
            if(finishedWords.length === WORDS.length){
                alert(`Game Over ${user.name}, you had ${user.wins} wins and ${user.losses} losses`);
                finishedWords = [];
                newGame = true;
                document.getElementById("lettersGuessed").style.visibility = "hidden";
                document.getElementById("hangTheMan").src = `assets/images/1.png`;
                document.getElementById("currentWordSpots").innerHTML = ``;
                start();
            }else{
            start();
            }
        }
    if(choice === false){
        wrong++;
        let currentImage = `assets/images/${IMG[wrong]}`;
        if(wrong < IMG.length){
            document.getElementById("hangTheMan").src = currentImage;
        }else{
            user.losses++;
            document.getElementById("info").innerHTML = `<span class="word-name">${WORDS[wordNum].name}:</span> ${WORDS[wordNum].description}`;
            finishedWords.push(workingName);
            document.getElementById("losses").innerHTML = `Losses<br>${user.losses}`;
            if(finishedWords.length === WORDS.length){
                finishedWords = [];
                alert(`Game Over ${user.name}, you had ${user.wins} wins and ${user.losses} losses`);
                newGame = true;
                document.getElementById("lettersGuessed").style.visibility = "hidden";
                document.getElementById("hangTheMan").src = `assets/images/1.png`;
                document.getElementById("currentWordSpots").innerHTML = ``;
            }
            start();
        }
    }
}
//logic for replacing underscores with the right key
function replacecharacters(key){
    let currentLetter = "";
    for(let i=0;i<characters.length;i++){
        if(characters[i] === key){
            currentLetter = characters[i];
            currentWord = currentWord.replace(key,"");
            let currentIndex = characters.indexOf(key);
            let indices = [];
            for(let b = 0;b<characters.length;b++){
                if(characters[b] === key){
                    indices.push(b)
                }
            }
            for(let a=0;a<blankCharacters.length;a++){
                for(let c=0;c<indices.length;c++){
                    let temp = indices[c];
                    blankCharacters[temp] = characters[temp]
                }    
            }
        }
        
    };
    //Establishing boolean for hangman disintegration(image changes)
    if (currentLetter === key){
        choice = true;
    }else if(currentLetter !== key){
        choice = false;
        numOfGuesses++;
    }
   populateDiv();
}
//As the player guesses correct letters, the length of 'currentWord' decreases.
function testWord(key){
    if(currentWord.length > 0){
    replacecharacters(key);
    }                
}
//Grabs the players typed character
document.onkeyup = function(evt) {
    let key = evt.key;
        if(lettersGuessed.indexOf(key)>-1){
            alert("Already Guessed that one");
        }else{
            lettersGuessed.push(key);
            let upperIt = key.toUpperCase();
            document.getElementById("lettersGuessed").innerHTML += ` ${upperIt},`
        }
        testWord(key);
};
document.getElementById("start").addEventListener("click", start);