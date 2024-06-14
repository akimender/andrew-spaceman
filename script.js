/*
CONST VARIABLES
const STRIKE_LIMIT = 10; // num of wrong answers allowed
let tries = 0; // counts up  with each wrong answer
*/
const STRIKE_LIMIT = 10
let tries = 0
let word = ""
const letterSpaces = []
const incorrectLetters = []
let keyboardOn = true;

/*
OBJECTS
*/
const wordGenerator = {
    bank: [
        'GALAXY',
        'UNIVERSE',
        'STAR',
        'EARTH',
        'COMET',
        'GRAVITY',
        'ROCKET',
        'ORBIT',
        'PLANET',
        'SUN'
    ],
    randomWord() {
        let randomIdx = Math.floor(Math.random() * this.bank.length)
        return this.bank[randomIdx]
    }
}

/*
EVENT LISTENERS
- listen for 'click' by a alphabetical key button
- listen for 'click' by end-screen retry button
*/
const keyboard = document.getElementById("keyboard")
const keys = keyboard.querySelectorAll("button")

keys.forEach((key) => {
    key.addEventListener("click", () => {
        if (keyboardOn) {
            let flipped = false
            key.setAttribute("disabled","disabled")
            for (let i = 0; i < letterSpaces.length; i++) {
                if (letterSpaces[i] != null) {
                    if (key.textContent == word[letterSpaces[i].id]) {
                        changeColor(key.textContent, "lightgreen")
                        flipLetter(i)
                        flipped = true
                    }
                }
            }
            if (flipped == false) {
                changeColor(key.textContent, "red")
                tries++
                const newIncorrectLetter = document.createElement("span")
                newIncorrectLetter.textContent = key.textContent
                newIncorrectLetter.style.color = "red"
                document.getElementById("incorrect-letters").append(newIncorrectLetter)
            }
            if (tries >= STRIKE_LIMIT) {
                endScreen("lose")
            } else {
                let allNull = true
                for (let i = 0; i < letterSpaces.length; i++) {
                    if (letterSpaces[i] != null) {
                        allNull = false
                    }
                }
                if (allNull) {
                    endScreen("win")
                }
            }
        }
    })
})


/*
FUNCTIONS
- changeColor(id, color): updates the color of a button from gray to corresponding color (green/red), makes button unclickable
- endGame(result): changes the webpage to a victory/defeat screen with a retry button

** function handling game logic **
-- checks if player input character is in the word
-- updates gamepage accordingly
*/

function initializeGame() {
    keyboardOn = true
    const incorrectLetters = document.createElement("div")
    incorrectLetters.id = "incorrect-letters"
    document.getElementById("letter-bank").append(incorrectLetters)
    word = wordGenerator.randomWord()
    for (let i = 0; i < word.length; i++) {
        letterSpaces.push(document.createElement("hr"))
        letterSpaces[i].id = `${i}`
        document.getElementById("word-container").appendChild(letterSpaces[i])
    }
}

function endScreen(result) {
    keyboardOn = false
    document.getElementById("letter-bank")
    const gameDisplay = document.getElementById("game-display")
    if (result == "win") {
        const winSign = document.createElement("h1")
        winSign.textContent = "YOU WIN!"
        winSign.style.backgroundColor = "lightgreen"
        gameDisplay.append(winSign)
    } else if (result == "lose") {
        const loseSign = document.createElement("h1")
        loseSign.textContent = "YOU LOSE!"
        loseSign.style.backgroundColor = "red"
        gameDisplay.append(loseSign)
    }
    gameDisplay.style.flexDirection = "column"
    const retryButton = document.createElement("button")
    retryButton.id = "retry-button"
    retryButton.textContent = "Try Again"
    gameDisplay.append(retryButton)
    retryButton.addEventListener("click", () => {
        location.reload()
    })
}

function endGame() {
    tries = 0
    for (let i = 0; i < word.length; i++) {
        const letterSpace = document.getElementById(`${i}`)
        document.getElementById("word-container").removeChild(letterSpace)
        letterSpaces.pop()
    }
    word = ""
    document.getElementById("incorrect-letters").remove()
}

function flipLetter(idx) {
    const wordDisplay = document.getElementById("word-container")
    const letterSpace = document.getElementById(`${idx}`)
    const revealedLetter = document.createElement("span")
    revealedLetter.textContent = word[idx]
    let letterAfter = null
    if (idx == word.length-1) {
        wordDisplay.appendChild(revealedLetter)
    } else {
        letterAfter = wordDisplay.children[idx+1]
        wordDisplay.insertBefore(revealedLetter, letterAfter)
    }
    wordDisplay.removeChild(letterSpace)
    letterSpaces.splice(idx, 1, null)
}

function changeColor(letter, color) {
    const key = document.getElementsByClassName(letter)[0]
    key.style.backgroundColor = color
}

initializeGame()