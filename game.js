document.getElementById('startGameButton').addEventListener('click', function() {
    const categories = [...document.querySelectorAll('#setupForm input:checked')].map(input => input.value);
    const playerCount = parseInt(document.getElementById('playerCount').value);
    const spyCount = parseInt(document.getElementById('spyCount').value);
    const timerLength = parseInt(document.getElementById('timerLength').value);

    // Überprüfen, ob die Eingaben korrekt sind
    if (categories.length === 0 || playerCount < 3 || spyCount < 1 || timerLength < 1) {
        alert("Bitte alle Felder korrekt ausfüllen.");
        return;
    }

    // Spiel starten
    startGame(categories, playerCount, spyCount, timerLength);
});

let playersRoles = [];
let currentPlayer = 0;
let timer;
let timerSeconds;

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

    // Spiel anzeigen
    document.getElementById('setupForm').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';

    // Rolle des ersten Spielers anzeigen
    document.getElementById('roleDisplay').textContent = "Spieler 1: " + playersRoles[0].role;

    // Button für nächsten Spieler
    document.getElementById('nextPlayerButton').style.display = 'block';
    document.getElementById('nextPlayerButton').addEventListener('click', showNextPlayer);

    // Button für Timer starten
    document.getElementById('startTimerButton').style.display = 'none';
    document.getElementById('startTimerButton').addEventListener('click', startTimer);
}

function getWordsFromCategories(categories) {
    const categoryWords = {
        "Tiere": ["Hund", "Katze", "Elefant", "Tiger", "Löwe", "Bär"],
        "Berufe": ["Arzt", "Lehrer", "Ingenieur", "Koch", "Polizist"],
        "Sportarten": ["Fußball", "Handball", "Schwimmen", "Tennis"],
        "Orte": ["Deutschland", "Europa", "Krankenhaus", "Schule"]
    };
    
    let words = [];
    categories.forEach(category => {
        words = words.concat(categoryWords[category] || []);
    });
    return words;
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function showNextPlayer() {
    currentPlayer++;
    if (currentPlayer < playersRoles.length) {
        document.getElementById('roleDisplay').textContent = `Spieler ${currentPlayer + 1}: ${playersRoles[currentPlayer].role}`;
    } else {
        document.getElementById('nextPlayerButton').style.display = 'none';
        document.getElementById('startTimerButton').style.display = 'block';
    }
}

function startTimer() {
    timerSeconds = parseInt(document.getElementById('timerLength').value) * 60;
    document.getElementById('timerDisplay').style.display = 'block';
    timer = setInterval(function() {
        if (timerSeconds <= 0) {
            clearInterval(timer);
            alert("Zeit abgelaufen!");
            document.getElementById('startTimerButton').style.display = 'none';
        } else {
            timerSeconds--;
            document.getElementById('timeRemaining').textContent = `Zeit übrig: ${formatTime(timerSeconds)}`;
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}m ${String(remainingSeconds).padStart(2, '0')}s`;
}

document.getElementById('endGameButton').addEventListener('click', function() {
    location.reload(); // Spiel zurücksetzen
});
