const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");

// Játék variáns elinditasa
let currentWord, correctLetters, wrongGuessCount;
const probalkozasok = 12;

const ujJatek = () => {
    // jatek varians es ui dolgok ujrakezdese
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "kepek/elem-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${probalkozasok}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    //Random szo kivalasztasa
    const { word } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word; // currentWord a random szo
    ujJatek();
}

const gameOver = (isVictory) => {
    // Jatek kesz reszletekkel
    const modalText = isVictory ? `A megfejtés:` : 'A megfejtés:';
    gameModal.querySelector("img").src = `kepek/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Kitaláltad!' : 'Nem sikerült!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
}

const initGame = (button, clickedLetter) => {
    // 
    if(currentWord.includes(clickedLetter)) {
        // a helyes betuk szavak kimutatasa
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // ha rosszat nyomsz elkezdi az akasztofat
        wrongGuessCount++;
        hangmanImage.src = `kepek/elem-${wrongGuessCount}.svg`;
    }
    button.disabled = true; // rossz betu kikapcsolasa
    guessesText.innerText = `${wrongGuessCount} / ${probalkozasok}`;

    // gameOver funckio hivasa ha kifogysz az eletbol
    if(wrongGuessCount === probalkozasok) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

// billentyu gombok krealasa
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);