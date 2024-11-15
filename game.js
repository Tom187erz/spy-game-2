document.addEventListener("DOMContentLoaded", function() {
    const startGameButton = document.getElementById("startGameButton");
    const categoryForm = document.getElementById("categoryForm");
    const playerCountInput = document.getElementById("playerCount");
    const spyCountInput = document.getElementById("spyCount");
    const timerLengthInput = document.getElementById("timerLength");

    const roleDisplay = document.getElementById("roleDisplay");
    const roleText = document.getElementById("roleText");
    const nextPlayerButton = document.getElementById("nextPlayerButton");

    const timerDisplay = document.getElementById("timerDisplay");
    const timerElement = document.getElementById("timer");
    const resetButton = document.getElementById("resetButton");
    const endGameButton = document.getElementById("endGameButton");

    const categories = {
        "Tiere": ["Hund", "Katze", "Elefant", "Tiger", "Löwe", "Bär"],
        "Berufe": ["Arzt", "Lehrer", "Ingenieur", "Koch", "Polizist"],
        "Sportarten": ["Fußball", "Handball", "Schwimmen", "Tennis"],
        "Orte": ["Deutschland", "Europa", "Krankenhaus", "Schule"]
    };

    let selectedCategories = [];
    let playerRoles = [];
    let currentPlayer = 0;
    let gameTimer;
    let timerSeconds;

    // Wenn der Benutzer das Spiel startet
    startGameButton.addEventListener("click", function() {
        // Kategorien aus dem Formular holen
        selectedCategories = Array.from(categoryForm.querySelectorAll('input[type="checkbox"]:checked'))
                                   .map(checkbox => checkbox.value);

        if (selectedCategories.length === 0) {
            alert("Bitte wähle mindestens eine Kategorie.");
            return;
        }

        // Spieleranzahl und Spionanzahl holen
        const playerCount = parseInt(playerCountInput.value, 10);
        const spyCount = parseInt(spyCountInput.value, 10);
        const timerLength = parseInt(timerLengthInput.value, 10);

        if (playerCount < 3 || spyCount >= playerCount) {
            alert("Fehler: Ungültige Spieleranzahl.");
            return;
        }

        // Spiel vorbereiten
        prepareGame(selectedCategories, playerCount, spyCount, timerLength);
    });

    // Spiel vorbereiten
    function prepareGame(categories, playerCount, spyCount, timerLength) {
        // Alle Wörter aus den Kategorien holen
        let allWords = [];
        categories.forEach(category => {
            allWords = allWords.concat(categories[category]);
        });

        // Geheimwort und Spione verteilen
        const secretWord = allWords[Math.floor(Math.random() * allWords.length)];
        playerRoles = [];

        for (let i = 0; i < playerCount - spyCount; i++) {
            playerRoles.push(`Geheimes Wort: ${secretWord}`);
        }
        for (let i = 0; i < spyCount; i++) {
            playerRoles.push("Du bist der Spion!");
        }

        // Rollen zufällig mischen
        playerRoles = shuffle(playerRoles);

        // Timer vorbereiten
        timerSeconds = timerLength * 60;
        roleDisplay.style.display = "block";
        showRole();
    }

    // Zeige die Rolle des aktuellen Spielers
    function showRole() {
        if (currentPlayer < playerRoles.length) {
            roleText.textContent = playerRoles[currentPlayer];
            nextPlayerButton.style.display = "block";
        } else {
            nextPlayerButton.style.display = "none";
            startTimer();
        }
    }

    // Spieler wechseln
    nextPlayerButton.addEventListener("click", function() {
        currentPlayer++;
        showRole();
    });

    // Timer starten
    function startTimer() {
        timerDisplay.style.display = "block";
        updateTimer();
        gameTimer = setInterval(updateTimer, 1000);
    }

    // Timer aktualisieren
    function updateTimer() {
        const minutes = Math.floor(timerSeconds / 60);
        const seconds = timerSeconds % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timerSeconds <= 0) {
            clearInterval(gameTimer);
            alert("Zeit abgelaufen!");
        } else {
            timerSeconds--;
        }
    }

    // Timer zurücksetzen
    resetButton.addEventListener("click", function() {
        timerSeconds -= 60;
        updateTimer();
    });

    // Spiel beenden
    endGameButton.addEventListener("click", function() {
        window.location.reload();
    });

    // Array zufällig mischen
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
