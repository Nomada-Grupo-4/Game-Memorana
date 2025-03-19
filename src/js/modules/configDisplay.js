// Módulo para actualizar la visualización de la configuración
import { gameState } from "./gameState.js"

export function updateConfigDisplay() {
    const currentMode = document.getElementById("currentMode")
    const currentCategory = document.getElementById("currentCategory")

    // Actualizar el modo de juego mostrado
    if (gameState.gameMode === "singlePlayer") {
        currentMode.textContent = "1 Jugador"
    } else if (gameState.gameMode === "twoPlayers") {
        currentMode.textContent = "2 Jugadores"
    } else if (gameState.gameMode === "vsComputer") {
        currentMode.textContent = "Contra la PC"
    }

    // Actualizar la categoría de cartas mostrada
    if (gameState.cardCategory === "emojis") {
        currentCategory.textContent = "Emojis"
    } else if (gameState.cardCategory === "animals") {
        currentCategory.textContent = "Animales"
    } else if (gameState.cardCategory === "tech") {
        currentCategory.textContent = "Tecnología"
    }
}

