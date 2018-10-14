// Available words - 20 words
var choices = ["dementor", "veritaserum", "bludger", "quidditch", "pensieve", "azkaban", "hogwarts", 
"slytherin", "gryffindor", "ravenclaw", "hufflepuff", "ilvermorny", "durmstrang", "beauxbatton", "patronus", 
"dumbledore", "horcrux", "obscurus", "niffler", "voldemort",];   

// Available letters
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", 
"o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",];

// How many "lives" a player gets
var maxLives = 10;

// How many "lives" are left
var remainingLives = 0;

// The array for the word we're trying to guess 
var wordInProgress = [];

// The word that was randomly selected for the game 
var selectedWord;

// Array for the letters that were already used 
var usedLetters = [];

// Total wins and losses
var wins = 0;
var losses = 0;

// Game started or finished
var gameStart;
var gameOver; 

// Function that resets the screen
// Block the text for win/lose results
function beginGame() {
    document.getElementById("pressTryAgain").style.display = "none";
    document.getElementById("youWin").style.display = "none";
    document.getElementById("youLose").style.display = "none";

    // Reset lives and clear the arrays
    remainingLives = maxLives;
    usedLetters = [];
    wordInProgress = [];

    // Select a word and block it from viewing
    selectedWord = Math.floor(Math.random() * (choices.length));
    for (var i = 0; i < choices[selectedWord].length; i++) {
        wordInProgress.push(" * ")
    };

    screenUpdates ();    
};

// Function that updates the screen 
function screenUpdates(){
    document.getElementById("win").textContent = wins;
    document.getElementById("lose").textContent = losses;
    document.getElementById("wordInPlay").textContent = "";
    
    for (var i = 0; i < wordInProgress.length; i++) {
        document.getElementById("wordInPlay").textContent += wordInProgress[i];
    };

    document.getElementById("guessesAvailable").textContent = remainingLives;
    document.getElementById("userGuesses").textContent = usedLetters;
    if (remainingLives <= 0) {
        document.getElementById("youLose").style.display = "block";
        document.getElementById("pressTryAgain").style.display = "block";
        losses++;
        gameOver = true;
    }
};

// Reset game after game over 
document.onkeyup = function(event) {
    if (gameOver) {
        beginGame();
        gameOver = false;
    } else {
      
       if(event.keyCode=letters) {
           guessLetter(event.key.toLowerCase());
       }
    }
};

var pressedLetter // The letter that was pressed 

function guessLetter(pressedLetter) {
    if (remainingLives > 0) {
        if (gameStart) {
            gameStart = true;
        }

// Check if this letter was used 
        if (usedLetters.indexOf(pressedLetter) === -1) {
            usedLetters.push(pressedLetter);
            checkLetter(pressedLetter);
        }
    }
    
    screenUpdates();
    checkWord();
};


function checkLetter(pressedLetter) {

// Array for letters in word 
var placeInWord = [];

// Run through the word to see if the letters are repeating 
for (var i = 0; i < choices[selectedWord].length; i++) {
    if(choices[selectedWord][i] === pressedLetter) {
        placeInWord.push(i);
    }
}

// In case the guess is wrong take out one life 
if (placeInWord.length <= 0) {
    remainingLives--;
} else {
    // If the guess is right update the letter in the word
    for(var i = 0; i < placeInWord.length; i++) {
        selectedWord[positions[i]] = pressedLetter;
    }
}
};

function checkWord() {
if(selectedWord.indexOf(" * ") === -1) {
    document.getElementById("youWin").style.display = "block";
    document.getElementById("pressTryAgain").style.display = "block";
    wins++;
    gameOver = true;
}
};



    






























