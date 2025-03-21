// Módulo para manejar la interfaz de usuario del juego
import { gameState } from "./gameState.js"

// Configurar la información del juego
export function setupGameInfo() {
  const gameInfo = document.getElementById("gameInfo")
  const player1NameElement = document.getElementById("player1Name")
  const player2NameElement = document.getElementById("player2Name")
  const player2Score = document.getElementById("player2Score")

  player1NameElement.textContent = gameState.player1Name

  let infoText = `Dificultad: ${getDifficultyText(gameState.difficulty)} | Categoría: ${getCategoryText(gameState.cardCategory)}`

  if (gameState.gameMode === "twoPlayers") {
    player2NameElement.textContent = gameState.player2Name
    player2Score.classList.remove("hidden")
    infoText = `Modo: 2 Jugadores | ${infoText}`
  } else if (gameState.gameMode === "vsComputer") {
    player2NameElement.textContent = "Computadora"
    player2Score.classList.remove("hidden")
    infoText = `Modo: Contra la PC | ${infoText}`
    console.log("Modo de juego contra la computadora configurado")
  } else {
    infoText = `Modo: 1 Jugador | ${infoText}`
  }

  gameInfo.textContent = infoText

  // Inicializar el indicador del jugador actual
  updateCurrentPlayerIndicator()
}

// Obtener el texto de la dificultad
function getDifficultyText(difficulty) {
  switch (difficulty) {
    case "easy":
      return "Fácil"
    case "medium":
      return "Medio"
    case "hard":
      return "Difícil"
    default:
      return "Medio"
  }
}

// Obtener el texto de la categoría
function getCategoryText(category) {
  switch (category) {
    case "emojis":
      return "Emojis"
    case "animals":
      return "Animales"
    case "tech":
      return "Tecnología"
    default:
      return "Emojis"
  }
}

// Actualizar el indicador del jugador actual
export function updateCurrentPlayerIndicator() {
  const player1Score = document.getElementById("player1Score")
  const player2Score = document.getElementById("player2Score")

  if (gameState.currentPlayer === 1) {
    player1Score.classList.add("pulse")
    player2Score.classList.remove("pulse")
    console.log("Indicador visual: turno del jugador 1")
  } else {
    player1Score.classList.remove("pulse")
    player2Score.classList.add("pulse")
    console.log("Indicador visual: turno del jugador 2 (o computadora)")
  }
}

