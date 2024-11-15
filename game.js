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

document.getElementById("startGameButton").addEventListener("click", startGame);
document.getElementById("nextPlayerButton").addEventListener("click", showPlayerRole);
document.getElementById("nextRoleButton").addEventListener("click", handleNextPlayer);

// Funktion zum Starten des Spiels
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

  let allWords = [];
  selectedCategories.forEach(category => {
    allWords = allWords.concat(categoryMap[category]);
  });

  const secretWord = allWords[Math.floor(Math.random() * allWords.length)];
  playerRoles = [];

  for (let i = 0; i < playerCount - spyCount; i++) {
    playerRoles.push(`Geheimes Wort: ${secretWord}`);
  }

  for (let i = 0; i < spyCount; i++) {
    playerRoles.push("Du bist der Spion!");
  }

  playerRoles = playerRoles.sort(() => Math.random() - 0.5);
  currentPlayer = 0;

  document.getElementById("status").textContent = "Spiel gestartet! Rollen werden nacheinander angezeigt.";
  showNextPlayerTransition();
}

// Funktion für den Übergang zum nächsten Spieler
function showNextPlayerTransition() {
  if (currentPlayer < playerRoles.length) {
    document.getElementById("nextPlayerContainer").style.display = "block";
    document.getElementById("roleContainer").style.display = "none";
    document.getElementById("nextPlayerButton").textContent = `Spieler ${currentPlayer + 1} bereit?`;
  } else {
    startGameTimer();
  }
}

// Funktion zur Anzeige der Rolle des Spielers
function showPlayerRole() {
  document.getElementById("roleContainer").style.display = "block";
  document.getElementById("nextPlayerContainer").style.display = "none";
  const role = playerRoles[currentPlayer];
  document.getElementById("playerRole").textContent = role;
  
  document.getElementById("nextRoleButton").textContent = currentPlayer === playerRoles.length - 1 ? "Spiel starten!" : "Nächster Spieler";
}

// Funktion, um zum nächsten Spieler zu wechseln oder das Spiel zu starten
function handleNextPlayer() {
  currentPlayer++;
  if (currentPlayer < playerRoles.length) {
    showNextPlayerTransition();
  } else {
    startGameTimer();
  }
}

// Timer-Funktion
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
