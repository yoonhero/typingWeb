const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");
timerCondition = true;
timerStart = true;
quoteInputElement.addEventListener("input", () => {
    if (timerStart) {
        startTimer();
        timerStart = false;
    }
    const arrayQuote = quoteDisplayElement.querySelectorAll("span");
    const arrayValue = quoteInputElement.value.split("");
    let correct = true;
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        if (character == null) {
            characterSpan.classList.remove("correct");
            characterSpan.classList.remove("incorrect");
            correct = false;
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect");
        } else {
            characterSpan.classList.remove("correct");
            characterSpan.classList.add("incorrect");
            correct = false;
        }
    });

    if (correct) {
        timerCondition = false;
        timerStart = true;
        setTimeout(() => {
            renderNewQuote();
        }, 3000);
    }
});

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then((response) => response.json())
        .then((data) => data.content);
}

async function renderNewQuote() {
    timerElement.innerText = 0;
    const quote = await getRandomQuote();
    quoteDisplayElement.innerText = "";
    quote.split("").forEach((character) => {
        const characterSpan = document.createElement("span");
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    });
    quoteInputElement.value = null;
}

let startTime;

function startTimer() {
    timerElement.innerText = 0;
    startTime = new Date();
    var interval = setInterval(() => {
        if (getTimerTime() != null) {
            timer.innerText = getTimerTime();
        }
    }, 1000);
}

function getTimerTime() {
    if (timerCondition) {
        return Math.floor((new Date() - startTime) / 1000);
    }
}

renderNewQuote();