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

// Initiales Setup
document.getElementById("startGameButton").addEventListener("click", startGame);

function startGame() {
  const playerCount = parseInt(document.getElementById("playerCount").value);
  const spyCount = parseInt(document.getElementById("spyCount").value);
  const timerLength = parseInt(document.getElementById("timerLength").value);

  const selectedCategories = Array.from(document.querySelectorAll("input[name='category']:checked"))
    .map(checkbox => checkbox.value);

  if (selectedCategories.length === 0 || playerCount < 3 || spyCount >= playerCount || timerLength < 1) {
    alert("Fehler: Ungültige Eingaben.");
    return;
  }

  // Wörter aus den ausgewählten Kategorien sammeln
  let allWords = [];
  selectedCategories.forEach(category => {
    allWords = allWords.concat(categoryMap[category]);
  });

  // Geheimes Wort auswählen und Rollen vorbereiten
  const secretWord = allWords[Math.floor(Math.random() * allWords.length)];
  playerRoles = [];

  for (let i = 0; i < playerCount - spyCount; i++) {
    playerRoles.push(`Geheimes Wort: ${secretWord}`);
  }

  for (let i = 0; i < spyCount; i++) {
    playerRoles.push("Du bist der Spion!");
  }

  // Rollen mischen
  playerRoles = playerRoles.sort(() => Math.random() - 0.5);
  currentPlayer = 0;

  // Spiel starten
  document.getElementById("status").textContent = "Spiel gestartet! Rollen werden nacheinander angezeigt.";
  showNextPlayerTransition();
}

// Funktion, um den nächsten Spieler zu fragen
function showNextPlayerTransition() {
  if (currentPlayer < playerRoles.length) {
    document.getElementById("roleContainer").style.display = "none";
    document.getElementById("nextPlayerContainer").style.display = "block";
    document.getElementById("nextPlayerButton").textContent = `Spieler ${currentPlayer + 1} bereit?`;
  } else {
    startGameTimer();
  }
}

// Funktion zur Anzeige der Spielerrolle
function showPlayerRole() {
  document.getElementById("roleContainer").style.display = "block";
  document.getElementById("nextPlayerContainer").style.display = "none";

  const role = playerRoles[currentPlayer];
  document.getElementById("playerRole").textContent = role;

  if (currentPlayer === playerRoles.length - 1) {
    document.getElementById("nextRoleButton").textContent = "Spiel starten!";
  } else {
    document.getElementById("nextRoleButton").textContent = "Nächster Spieler";
  }
}

// Funktion, um den nächsten Spieler vorzubereiten
document.getElementById("nextPlayerButton").addEventListener("click", () => {
  showPlayerRole();
});

document.getElementById("nextRoleButton").addEventListener("click", () => {
  currentPlayer++;
  if (currentPlayer < playerRoles.length) {
    showNextPlayerTransition();
  } else {
    startGameTimer();
  }
});

// Timer starten
function startGameTimer() {
  const timerLength = parseInt(document.getElementById("timerLength").value);
  timerSeconds = timerLength * 60;
  document.getElementById("timer").textContent = `Zeit übrig: ${Math.floor(timerSeconds / 60)}m ${timerSeconds % 60}s`;

  timer = setInterval(() => {
    if (timerSeconds <= 0) {
      clearInterval(timer);
      document.getElementById("status").textContent = "Zeit abgelaufen!";
      alert("Zeit abgelaufen!");
    } else {
      timerSeconds--;
      document.getElementById("timer").textContent = `Zeit übrig: ${Math.floor(timerSeconds / 60)}m ${timerSeconds % 60}s`;
    }
  }, 1000);
}
