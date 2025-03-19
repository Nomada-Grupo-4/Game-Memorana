// Módulo para manejar los modos de juego
import { gameState } from "./gameState.js"
import { updateConfigDisplay } from "./configDisplay.js"

export function setupGameModes() {
  const singlePlayer = document.getElementById("singlePlayer")
  const twoPlayers = document.getElementById("twoPlayers")
  const vsComputer = document.getElementById("vsComputer")

  singlePlayer.addEventListener("change", function () {
    if (this.checked) {
      gameState.setGameMode("singlePlayer")
      updateConfigDisplay()
    }
  })

  twoPlayers.addEventListener("change", function () {
    if (this.checked) {
      gameState.setGameMode("twoPlayers")
      updateConfigDisplay()
    }
  })

  vsComputer.addEventListener("change", function () {
    if (this.checked) {
      gameState.setGameMode("vsComputer")
      updateConfigDisplay()
    }
  })

  // Configurar el botón de aplicar configuración
  const applyConfigBtn = document.getElementById("applyConfigBtn")
  applyConfigBtn.addEventListener("click", () => {
    // Cambiar a la sección de registro
    const registerSection = document.getElementById("registerSection")
    const configSection = document.getElementById("configSection")
    const registerBtn = document.getElementById("registerBtn")
    const configBtn = document.getElementById("configBtn")

    registerSection.classList.remove("hidden")
    configSection.classList.add("hidden")
    registerBtn.classList.add("bg-white")
    configBtn.classList.remove("bg-white")

    // Actualizar el campo del segundo jugador
    updatePlayer2Field()
  })
}

export function updatePlayer2Field() {
  const player2Section = document.getElementById("player2Section")

  if (gameState.gameMode === "twoPlayers") {
    player2Section.classList.remove("hidden")
  } else {
    player2Section.classList.add("hidden")
  }
}

