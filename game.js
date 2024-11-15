const categories = {
    Tiere: ["Hund", "Katze", "Elefant", "Tiger", "Löwe", "Bär"],
    Berufe: ["Arzt", "Lehrer", "Ingenieur", "Koch", "Polizist"],
    Sportarten: ["Fußball", "Handball", "Schwimmen", "Tennis"],
    Orte: ["Deutschland", "Europa", "Krankenhaus", "Schule"]
};

let playerRoles = [];
let currentPlayer = 0;
let timer;
let timerSeconds;

document.getElementById('startGameButton').addEventListener('click', function() {
    // Holt die ausgewählten Kategorien aus dem Formular
    const selectedCategories = Array.from(document.querySelectorAll('#categoryForm input[type="checkbox"]:checked'))
                                     .map(checkbox => checkbox.value);

    if (selectedCategories.length === 0) {
        alert("Bitte wähle mindestens eine Kategorie.");
        return;
    }

    // Holt die Spieleranzahl, Spionanzahl und Timer-Länge
    const playerCount = parseInt(document.getElementById('playerCount').value, 10);
    const spyCount = parseInt(document.getElementById('spyCount').value, 10);
    const timerLength = parseInt(document.getElementById('timerLength').value, 10);

    if (playerCount < 3 || spyCount >= playerCount) {
        alert("Fehler: Ungültige Spieleranzahl.");
        return;
    }

    // Spiel vorbereiten
    prepareGame(selectedCategories, playerCount, spyCount, timerLength);
});

function prepareGame(selectedCategories, playerCount, spyCount, timerLength) {
    let allWords = [];

    // Alle Wörter aus den ausgewählten Kategorien sammeln
    selectedCategories.forEach(category => {
        allWords = allWords.concat(categories[category]);
    });

    // Zufällig ein geheimes Wort aus den ausgewählten Kategorien auswählen
    const secretWord = allWords[Math.floor(Math.random() * allWords.length)];

    // Die Spielrollen (Spione und normale Spieler) festlegen
    playerRoles = [];
    for (let i = 0; i < playerCount - spyCount; i++) {
        playerRoles.push(`Geheimes Wort: ${secretWord}`);
    }
    for (let i = 0; i < spyCount; i++) {
        playerRoles.push("Du bist der Spion!");
    }

    // Spielerrollen mischen
    playerRoles = shuffle(playerRoles);

    // Spielstart und Timer initialisieren
    document.getElementById('gameContainer').style.display = 'block';
    document.getElementById('startGameButton').style.display = 'none';

    showRole();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Tauschen
    }
    return array;
}

function showRole() {
    const roleDisplay = document.getElementById('roleDisplay');
    roleDisplay.textContent = "Spieler " + (currentPlayer + 1) + ": Deine Rolle wird jetzt aufgedeckt.";

    // Anzeigen der Rolle des Spielers
    const role = playerRoles[currentPlayer];
    roleDisplay.innerHTML = `Deine Rolle: <strong>${role}</strong>`;

    // Verstecken der "Nächster Spieler" und "Spiel starten!" Buttons für alle bis auf den letzten Spieler
    if (currentPlayer === playerRoles.length - 1) {
        document.getElementById('startTimerButton').style.display = 'inline-block';
        document.getElementById('nextPlayerButton').style.display = 'none';
    } else {
        document.getElementById('startTimerButton').style.display = 'none';
        document.getElementById('nextPlayerButton').style.display = 'inline-block';
    }
}

document.getElementById('nextPlayerButton').addEventListener('click', function() {
    currentPlayer++;
    showRole();
});

document.getElementById('startTimerButton').addEventListener('click', function() {
    startGameTimer();
});

function startGameTimer() {
    const timerLength = parseInt(document.getElementById('timerLength').value, 10);
    timerSeconds = timerLength * 60;

    timer = setInterval(function() {
        const minutes = Math.floor(timerSeconds / 60);
        const seconds = timerSeconds % 60;

        document.getElementById('timeRemaining').textContent = `Zeit übrig: ${minutes}m ${seconds}s`;

        if (timerSeconds <= 0) {
            clearInterval(timer);
            alert("Zeit abgelaufen!");
        } else {
            timerSeconds--;
        }
    }, 1000);

    document.getElementById('timerDisplay').style.display = 'block';
}
