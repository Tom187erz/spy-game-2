document.getElementById('startButton').addEventListener('click', function() {
    // Eingabewerte auslesen
    const players = parseInt(document.getElementById('players').value);
    const spies = parseInt(document.getElementById('spies').value);
    const time = parseInt(document.getElementById('time').value);
    const categories = Array.from(document.getElementById('category').selectedOptions).map(option => option.value);

    if (players < 3 || spies >= players || time < 1) {
        alert("Fehler: Ungültige Eingaben.");
        return;
    }

    // Spiellogik hier einfügen
    const allWords = getWordsFromCategories(categories);  // Hier die Wörter je Kategorie einfügen
    startGame(players, spies, allWords, time);
});

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

function startGame(players, spies, allWords, time) {
    alert("Spiel startet!");
    // Timer starten
    let timerSeconds = time * 60;
    let interval = setInterval(function() {
        if (timerSeconds <= 0) {
            clearInterval(interval);
            alert("Zeit abgelaufen!");
            document.getElementById("status").innerHTML = "<span class='game-over'>Spiel beendet! Zeit abgelaufen!</span>";
        } else {
            timerSeconds--;
            const minutes = Math.floor(timerSeconds / 60);
            const seconds = timerSeconds % 60;
            document.getElementById('timer').textContent = `Zeit übrig: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        }
    }, 1000);

    // Rollen und Spielvorbereitung
    let roles = prepareRoles(players, spies, allWords);
    document.getElementById("status").innerHTML = `Spiel vorbereitet! <br>Spieler werden ihre Rollen angezeigt bekommen.`;
    alert("Spiel vorbereitet: " + roles.join(", "));
}

function prepareRoles(players, spies, allWords) {
    const secretWord = allWords[Math.floor(Math.random() * allWords.length)];
    let roles = [];

    for (let i = 0; i < players - spies; i++) {
        roles.push("Geheimes Wort: " + secretWord);
    }
    for (let i = 0; i < spies; i++) {
        roles.push("Du bist der Spion!");
    }

    return roles;
}
