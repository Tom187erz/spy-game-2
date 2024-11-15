const categoryMap = {
  Tiere: ["Hund", "Katze", "Elefant", "Tiger", "Löwe", "Bär"],
  Berufe: ["Arzt", "Lehrer", "Ingenieur", "Koch", "Polizist"],
  Sportarten: ["Fußball", "Handball", "Schwimmen", "Tennis"],
  Orte: ["Deutschland", "Europa", "Krankenhaus", "Schule"]
};

let playerRoles = [];
let currentPlayer = 0;
let timer;
let timerSeconds = 0;
let isGameStarted = false;

document.getElementById("startGameButton").addEventListener("click", startGame);
document.getElementById("revealRoleButton").addEventListener("click", showPlayerRole);
document.getElementById("nextPlayerButton").addEventListener("click", nextPlayerTransition);

// Spiel starten und Rollen verteilen
function startGame() {
  const playerCount = parseInt(document.getElementById("playerCount").value);
  const spyCount = parseInt(document.getElementById("spyCount").value);
  const timerLength = parseInt(document.getElementById("timerLength").value);

  const selectedCategories = Array.from(document.querySelectorAll("input[name='category']:checked"))
    .map(checkbox => checkbox.value);

  if (selectedCategories.length === 0) {
    alert("Bitte mindestens eine Kategorie auswählen.");
    return;
  }

  if (isNaN(playerCount) || isNaN(spyCount) || isNaN(timerLength) || playerCount < 3 || spyCount >= playerCount || timerLength < 1) {
    alert("Fehler: Ungültige Eingaben.");
    return;
  }

  // Wörter aus den ausgewählten Kategorien sammeln
  let allWords = [];
  selectedCategories.forEach(category => {
    allWords = allWords.concat(categoryMap[category]);
  });

  // Geheimes Wort wählen
  const secretWord = allWords[Math.floor(Math.random() * allWords.length)];
  playerRoles = [];

  // Rollen für die Spieler erstellen
  for (let i = 0; i < playerCount - spyCount; i++) {
    playerRoles.push(`Geheimes Wort: ${secretWord}`);
  }
  for (let i = 0; i < spyCount; i++) {
    playerRoles.push("Du bist der Spion!");
  }

  // Rollen mischen
  playerRoles = playerRoles.sort(() => Math.random() - 0.5);
  currentPlayer = 0;
  isGameStarted = true;

  // Status aktualisieren und Spielübergang starten
  document.getElementById("status").textContent = "Spiel gestartet! Spieler sehen nacheinander ihre Rollen.";
  document.getElementById("roleContainer").style.display = "none";
  document.getElementById("transitionContainer").style.display = "block";
  document.getElementById("nextPlayerButton").textContent = `Spieler ${currentPlayer + 1} bereit?`;
}

// Übergang zum nächsten Spieler anzeigen
function nextPlayerTransition() {
  if (!isGameStarted) return;
  document.getElementById("transitionContainer").style.display = "none";
  document.getElementById("roleContainer").style.display = "block";
}

// Rolle des aktuellen Spielers anzeigen
function showPlayerRole() {
  const role = playerRoles[currentPlayer];
  document.getElementById("playerRole").textContent = role;

  // Spielerwechsel vorbereiten
  if (currentPlayer < playerRoles.length - 1) {
    currentPlayer++;
    document.getElementById("revealRoleButton").style.display = "none";
    document.getElementById("nextPlayerButton").textContent = `Nächster Spieler`;
    document.getElementById("transitionContainer").style.display = "block";
    document.getElementById("roleContainer").style.display = "none";
  } else {
    document.getElementById("revealRoleButton").style.display = "none";
    document.getElementById("nextPlayerButton").style.display = "none";
    document.getElementById("status").textContent = "Alle Spieler haben ihre Rolle gesehen. Spiel kann starten!";
    startGameTimer();
  }
}

// Timer starten
function startGameTimer() {
  const timerLength = parseInt(document.getElementById("timerLength").value);
  timerSeconds = timerLength * 60;

  const updateTimer = () => {
    if (timerSeconds <= 0) {
      clearInterval(timer);
      alert("Zeit abgelaufen!");
      document.getElementById("status").textContent = "Zeit abgelaufen!";
    } else {
      timerSeconds--;
      const minutes = Math.floor(timerSeconds / 60);
      const seconds = timerSeconds % 60;
      document.getElementById("timer").textContent = `Zeit übrig: ${minutes}m ${seconds < 10 ? "0" + seconds : seconds}s`;
    }
  };

  timer = setInterval(updateTimer, 1000);
}
