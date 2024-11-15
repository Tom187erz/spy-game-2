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

// DOM-Elemente abrufen
const startGameButton = document.getElementById("startGameButton");
const nextPlayerButton = document.getElementById("nextPlayerButton");
const revealRoleButton = document.getElementById("revealRoleButton");
const playerRoleElement = document.getElementById("playerRole");
const transitionContainer = document.getElementById("transitionContainer");
const roleContainer = document.getElementById("roleContainer");
const statusElement = document.getElementById("status");
const timerElement = document.getElementById("timer");

startGameButton.addEventListener("click", startGame);
revealRoleButton.addEventListener("click", revealPlayerRole);
nextPlayerButton.addEventListener("click", showNextPlayerTransition);

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

  // Alle Wörter der ausgewählten Kategorien sammeln
  let allWords = [];
  selectedCategories.forEach(category => {
    allWords = allWords.concat(categoryMap[category]);
  });

  // Geheimwort auswählen
  const secretWord = allWords[Math.floor(Math.random() * allWords.length)];
  playerRoles = [];

  // Rollen zuweisen: Spione und normale Spieler
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

  // UI aktualisieren
  statusElement.textContent = "Spiel gestartet! Spieler sehen nacheinander ihre Rollen.";
  transitionContainer.style.display = "block";
  roleContainer.style.display = "none";
  nextPlayerButton.textContent = `Spieler ${currentPlayer + 1} bereit?`;
}

// Übergang zum nächsten Spieler
function showNextPlayerTransition() {
  if (!isGameStarted) return;

  // Übergangsfenster für den nächsten Spieler anzeigen
  transitionContainer.style.display = "block";
  roleContainer.style.display = "none";
  nextPlayerButton.textContent = `Spieler ${currentPlayer + 1} bereit?`;
}

// Rolle des aktuellen Spielers anzeigen
function revealPlayerRole() {
  const role = playerRoles[currentPlayer];
  playerRoleElement.textContent = role;

  // Rolle anzeigen und auf den nächsten Spieler vorbereiten
  transitionContainer.style.display = "none";
  roleContainer.style.display = "block";

  // Button für den nächsten Spieler
  revealRoleButton.textContent = currentPlayer < playerRoles.length - 1 ? "Nächster Spieler" : "Spiel starten!";
  revealRoleButton.onclick = () => {
    if (currentPlayer < playerRoles.length - 1) {
      currentPlayer++;
      showNextPlayerTransition();
    } else {
      statusElement.textContent = "Alle Spieler haben ihre Rolle gesehen. Spiel beginnt jetzt!";
      roleContainer.style.display = "none";
      startGameTimer();
    }
  };
}

// Timer starten
function startGameTimer() {
  const timerLength = parseInt(document.getElementById("timerLength").value);
  timerSeconds = timerLength * 60;

  const updateTimer = () => {
    if (timerSeconds <= 0) {
      clearInterval(timer);
      alert("Zeit abgelaufen!");
      statusElement.textContent = "Zeit abgelaufen!";
    } else {
      timerSeconds--;
      const minutes = Math.floor(timerSeconds / 60);
      const seconds = timerSeconds % 60;
      timerElement.textContent = `Zeit übrig: ${minutes}m ${seconds < 10 ? "0" + seconds : seconds}s`;
    }
  };

  timer = setInterval(updateTimer, 1000);
}
