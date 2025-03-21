// Módulo para manejar los modales
import { gameState } from "./gameState.js"
import { restartGame, goToMenu } from "../game.js"

// Mostrar el modal de victoria
export function showVictoryModal() {
  const victoryModal = document.getElementById("victoryModal")
  const victoryMessage = document.getElementById("victoryMessage")

  // Personalizar el mensaje según el modo de juego
  if (gameState.gameMode === "twoPlayers") {
    if (gameState.player1Points > gameState.player2Points) {
      victoryMessage.textContent = `¡${gameState.player1Name} ha ganado con ${gameState.player1Points} pares encontrados!`
    } else if (gameState.player2Points > gameState.player1Points) {
      victoryMessage.textContent = `¡${gameState.player2Name} ha ganado con ${gameState.player2Points} pares encontrados!`
    } else {
      victoryMessage.textContent = `¡Empate! Ambos jugadores encontraron ${gameState.player1Points} pares.`
    }
  } else if (gameState.gameMode === "vsComputer") {
    if (gameState.player1Points > gameState.player2Points) {
      victoryMessage.textContent = `¡Has ganado a la computadora con ${gameState.player1Points} pares encontrados!`
    } else if (gameState.player2Points > gameState.player1Points) {
      victoryMessage.textContent = `La computadora ha ganado con ${gameState.player2Points} pares encontrados.`
    } else {
      victoryMessage.textContent = `¡Empate! Ambos encontraron ${gameState.player1Points} pares.`
    }
  } else {
    victoryMessage.textContent = `¡Has completado el juego con ${gameState.timeLeft} segundos restantes!`
  }

  // Mostrar el modal
  victoryModal.classList.add("opacity-100")
  victoryModal.classList.remove("pointer-events-none")
}

// Mostrar el modal de game over
export function showGameOverModal() {
  const gameOverModal = document.getElementById("gameOverModal")
  const gameOverMessage = document.getElementById("gameOverMessage")

  // Personalizar el mensaje según el modo de juego
  if (gameState.gameMode === "twoPlayers" || gameState.gameMode === "vsComputer") {
    if (gameState.player1Points > gameState.player2Points) {
      gameOverMessage.textContent = `Tiempo agotado. ¡${gameState.player1Name} ha ganado con ${gameState.player1Points} pares encontrados!`
    } else if (gameState.player2Points > gameState.player1Points) {
      gameOverMessage.textContent = `Tiempo agotado. ¡${gameState.gameMode === "vsComputer" ? "La computadora" : gameState.player2Name} ha ganado con ${gameState.player2Points} pares encontrados!`
    } else {
      gameOverMessage.textContent = `Tiempo agotado. ¡Empate! Ambos encontraron ${gameState.player1Points} pares.`
    }
  } else {
    gameOverMessage.textContent = `Se acabó el tiempo. Has encontrado ${gameState.player1Points} de ${gameState.totalPairs} pares.`
  }

  // Mostrar el modal
  gameOverModal.classList.add("opacity-100")
  gameOverModal.classList.remove("pointer-events-none")
}

// Configurar los botones de los modales
export function setupModalButtons() {
  // Botones del modal de victoria
  document.getElementById("playAgainBtn").addEventListener("click", restartGame)
  document.getElementById("backToMenuBtn").addEventListener("click", goToMenu)

  // Botones del modal de game over
  document.getElementById("tryAgainBtn").addEventListener("click", restartGame)
  document.getElementById("backToMenuBtnGameOver").addEventListener("click", goToMenu)
}

