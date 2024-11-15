// Kategorien mit ihren jeweiligen Wörtern
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

    // Die Spielrollen (Spione und normale Spieler) festlegen
    playerRoles = [];
    for (let i = 0; i < playerCount - spyCount; i++) {
        playerRoles.push("Du bist ein normaler Spieler!");
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
    roleDisplay.innerHTML = `Spieler ${currentPlayer + 1}: Deine Rolle wird jetzt aufgedeckt.<br><strong>${playerRoles[currentPlayer]}</strong>`;

    // Wenn der letzte Spieler, der Button wird angezeigt
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

document.getElement
