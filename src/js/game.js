// Archivo principal del juego que importa y coordina todos los módulos
import { getTimeLimit, startTimer, updateTimer } from "./modules/timer.js"
import { setupModalButtons } from "./modules/modals.js"
import { setupGameInfo, updateCurrentPlayerIndicator } from "./modules/gameUI.js"
import { setupGameBoard } from "./modules/gameBoard.js"
import { loadCardImages } from "./modules/cardLoader.js"
import { computerPlay } from "./modules/computerAI.js"
import { gameState } from "./modules/gameState.js"

// Inicializar el juego cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  // Obtener parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search)

  // Configurar el estado del juego con los parámetros de la URL
  gameState.setGameParameters({
    mode: urlParams.get("mode") || "singlePlayer",
    difficulty: urlParams.get("difficulty") || "medium",
    category: urlParams.get("category") || "emojis",
    player1: urlParams.get("player1") || "Jugador 1",
    player2: urlParams.get("player2") || "Jugador 2",
  })

  // Configurar la información del juego
  setupGameInfo()

  // Configurar el tablero según la dificultad
  setupGameBoard()

  // Configurar el temporizador
  gameState.timeLeft = getTimeLimit()
  updateTimer()
  startTimer()

  // Configurar los botones de los modales
  setupModalButtons()

  // Si el modo es contra la computadora y el jugador inicial es la computadora, hacer que juegue
  if (gameState.gameMode === "vsComputer" && gameState.currentPlayer === 2) {
    setTimeout(() => {
      computerPlay()
    }, 1000)
  }
})

// Reiniciar el juego
export function restartGame() {
  // Ocultar los modales
  document.getElementById("victoryModal").classList.remove("opacity-100")
  document.getElementById("victoryModal").classList.add("pointer-events-none")
  document.getElementById("gameOverModal").classList.remove("opacity-100")
  document.getElementById("gameOverModal").classList.add("pointer-events-none")

  // Reiniciar variables
  clearInterval(gameState.timer)
  gameState.resetGame()

  // Actualizar indicador de jugador actual
  updateCurrentPlayerIndicator()

  // Recargar las cartas
  loadCardImages()

  // Reiniciar el temporizador
  gameState.timeLeft = getTimeLimit()
  updateTimer()
  startTimer()

  // Si el modo es contra la computadora y el jugador inicial es la computadora, hacer que juegue
  if (gameState.gameMode === "vsComputer" && gameState.currentPlayer === 2) {
    setTimeout(() => {
      computerPlay()
    }, 1000)
  }
}

// Volver al menú principal
export function goToMenu() {
  window.location.href = "index.html"
}

// Exportar la función computerPlay para que pueda ser usada en otros módulos
export { computerPlay }

