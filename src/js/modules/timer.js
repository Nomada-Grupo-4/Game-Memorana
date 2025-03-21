// Módulo para manejar el temporizador
import { gameState } from "../game.js"
import { showGameOverModal } from "./modals.js"

// Obtener el límite de tiempo según la dificultad
export function getTimeLimit() {
  switch (gameState.difficulty) {
    case "easy":
      return 60 // 1 minuto
    case "medium":
      return 120 // 2 minutos
    case "hard":
      return 180 // 3 minutos
    default:
      return 120
  }
}

// Iniciar el temporizador
export function startTimer() {
  gameState.timer = setInterval(() => {
    gameState.timeLeft--
    updateTimer()

    if (gameState.timeLeft <= 0) {
      clearInterval(gameState.timer)
      showGameOverModal()
    }
  }, 1000)
}

// Actualizar el temporizador en la interfaz
export function updateTimer() {
  const timerElement = document.getElementById("timer")
  const minutes = Math.floor(gameState.timeLeft / 60)
  const seconds = gameState.timeLeft % 60
  timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

  // Cambiar el color cuando queda poco tiempo
  if (gameState.timeLeft <= 10) {
    timerElement.classList.add("text-red-600")
    timerElement.classList.add("font-bold")
  } else {
    timerElement.classList.remove("text-red-600")
    timerElement.classList.remove("font-bold")
  }
}

