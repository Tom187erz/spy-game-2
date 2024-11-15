let currentPlayer = 0;
let playersRoles = [];
let timer;
let timerSeconds;

const words = {
    "Tiere": ["Hund", "Katze", "Elefant", "Tiger", "Löwe", "Bär"],
    "Berufe": ["Arzt", "Lehrer", "Ingenieur", "Koch", "Polizist"],
    "Sportarten": ["Fußball", "Handball", "Schwimmen", "Tennis"],
    "Orte": ["Deutschland", "Europa", "Krankenhaus", "Schule"]
};

document.getElementById('startGameButton').addEventListener('click', function() {
    const categories = [...document.querySelectorAll('#categoryForm input:checked')].map(input => input.value);
    const playerCount = parseInt(document.getElementById('playerCount').value);
    const spyCount = parseInt(document.getElementById('spyCount').value);
    const timerLength = parseInt(document.getElementById('timerLength').value);

    if (categories.length === 0 || playerCount < 3 || spyCount < 1 || timerLength < 1) {
        alert("Bitte alle Felder korrekt ausfüllen.");
        return;
    }

    startGame(categories, playerCount, spyCount, timerLength);
});

// Spiel starten und Spielerrollen zufällig zuteilen
function startGame(categories, playerCount, spyCount, timerLength) {
    const allWords = getWordsFromCategories(categories);
    const secretWord = allWords[Math.floor(Math.random() * allWords.length)];

    playersRoles = [];
    for (let i = 0; i < playerCount - spyCount; i++) {
        playersRoles.push({ role: "Geheimes Wort: " + secretWord, isSpy: false });
    }
    for (let i = 0; i < spyCount; i++) {
        playersRoles.push({ role: "Du bist der Spion!", isSpy: true });
    }

    playersRoles = shuffle(playersRoles);

    document.getElementById('gameContainer').style.display = 'block';
    document.getElementById('roleDisplay').textContent = "Spieler 1: " + playersRoles[0].role;
    document.getElementById('nextPlayerButton').style.display = 'block';
    document.getElementById('startTimerButton').style.display = 'none';

    // Timer
    timerSeconds = timerLength * 60;
    document.getElementById('timeRemaining').textContent = formatTime(timerSeconds);
    document.getElementById('startTimerButton').addEventListener('click', startTimer);
}

function getWordsFromCategories(categories) {
    let allWords = [];
    categories.forEach(category => {
        allWords = allWords.concat(words[category]);
    });
    return allWords;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `Zeit übrig: ${minutes}m ${remainingSeconds}s`;
}

// Nächster Spieler
document.getElementById('nextPlayerButton').addEventListener('click', function() {
    currentPlayer++;
    if (currentPlayer < playersRoles.length) {
        document.getElementById('roleDisplay').textContent = `Spieler ${currentPlayer + 1}: ${playersRoles[currentPlayer].role}`;
    } else {
        document.getElementById('nextPlayerButton').style.display = 'none';
        document.getElementById('startTimerButton').style.display = 'block';
    }
});

// Timer starten
function startTimer() {
    timer = setInterval(function() {
        if (timerSeconds <= 0) {
            clearInterval(timer);
            alert("Zeit abgelaufen!");
            document.getElementById('startTimerButton').style.display = 'none';
        } else {
            timerSeconds--;
            document.getElementById('timeRemaining').textContent = formatTime(timerSeconds);
        }
    }, 1000);
}

// Spiel beenden
document.getElementById('endGameButton').addEventListener('click', function() {
    location.reload();
});
