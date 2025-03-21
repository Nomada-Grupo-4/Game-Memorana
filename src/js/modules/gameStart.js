// Módulo para iniciar el juego
import { gameState } from "./gameState.js"

export function setupGameStart() {
    const startGameBtn = document.getElementById("startGameBtn")

    startGameBtn.addEventListener("click", () => {
        // Obtener la dificultad seleccionada
        const difficulty = document.querySelector('input[name="difficulty"]:checked').value

        // Obtener nombres de jugadores
        const player1 = document.getElementById("username1").value || "Jugador 1"
        let player2 = ""

        if (gameState.gameMode === "twoPlayers") {
            player2 = document.getElementById("username2").value || "Jugador 2"
        }

        // Construir la URL con los parámetros
        let gameUrl = `game.html?mode=${gameState.gameMode}&difficulty=${difficulty}&category=${gameState.cardCategory}&player1=${encodeURIComponent(player1)}`

        if (gameState.gameMode === "twoPlayers") {
            gameUrl += `&player2=${encodeURIComponent(player2)}`
        }

        // Redirigir a la página del juego
        window.location.href = gameUrl
    })
}

