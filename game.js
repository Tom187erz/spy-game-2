let currentPlayer = 0;
let playersRoles = [];
let timer;
let timerSeconds;

// Funktion zum Starten des Spiels
document.getElementById('startGameButton').addEventListener('click', function() {
    const categories = [...document.querySelectorAll('#categoryForm input:checked')].map(input => input.value);
    const playerCount = document.getElementById('playerCount').value;
    const spyCount = document.getElementById('spyCount').value;
    const timerLength = document.getElementById('timerLength').value;

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
        playersRoles.push(`Geheimes Wort: ${secretWord}`);
    }
    for (let i = 0; i < spyCount; i++) {
        playersRoles.push("Du bist der Spion!");
    }
    shuffleArray(playersRoles);

    document.getElementById('gameContainer').style.display = 'block';
    document.getElementById('startGameButton').style.display = 'none';
    showNextPlayerRole();
}

// Nächster Spieler
function showNextPlayerRole() {
    if (currentPlayer < playersRoles.length) {
        document.getElementById('roleDisplay').textContent = `Spieler ${currentPlayer + 1}: ${playersRoles[currentPlayer]}`;
        document.getElementById('nextPlayerButton').style.display = 'inline-block';
    } else {
        document.getElementById('nextPlayerButton').style.display = 'none';
        document.getElementById('startTimerButton').style.display = 'inline-block';
    }
}

// Nächster Spieler oder Timer starten
document.getElementById('nextPlayerButton').addEventListener('click', function() {
    currentPlayer++;
    showNextPlayerRole();
});

document.getElementById('startTimerButton').addEventListener('click', function() {
    startTimer(timerLength);
});

// Timer starten
function startTimer(timerLength) {
    timerSeconds = timerLength * 60;
    timer = setInterval(function() {
        if (timerSeconds <= 0) {
            clearInterval(timer);
            alert("Zeit abgelaufen!");
            document.getElementById('timeRemaining').textContent = "Zeit abgelaufen!";
        } else {
            const minutes = Math.floor(timerSeconds / 60);
            const seconds = timerSeconds % 60;
            document.getElementById('timeRemaining').textContent = `Zeit übrig: ${minutes}m ${seconds}s`;
            timerSeconds--;
        }
    }, 1000);

    document.getElementById('timerDisplay').style.display = 'block';
}

// Spiel zurücksetzen
document.getElementById('endGameButton').addEventListener('click', function() {
    resetGame();
});

function resetGame() {
    currentPlayer = 0;
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('startGameButton').style.display = 'inline-block';
    document.getElementById('timerDisplay').style.display = 'none';
    document.getElementById('timeRemaining').textContent = "";
}

// Hilfsfunktionen
function getWordsFromCategories(categories) {
    const words = {
        "Tiere": ["Hund", "Katze", "Elefant", "Tiger", "Löwe", "Bär"],
        "Berufe": ["Arzt", "Lehrer", "Ingenieur", "Koch", "Polizist"],
        "Sportarten": ["Fußball", "Handball", "Schwimmen", "Tennis"],
        "Orte": ["Deutschland", "Europa", "Krankenhaus", "Schule"]
    };

    let selectedWords = [];
    categories.forEach(category => {
        selectedWords = selectedWords.concat(words[category]);
    });
    return selectedWords;
}

// Array shuffle-Funktion
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap
    }
}
