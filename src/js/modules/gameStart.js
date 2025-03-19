// Módulo para iniciar el juego
import { gameState } from "./gameState.js"

export function setupGameStart() {
    const startGameBtn = document.getElementById("startGameBtn")

    startGameBtn.addEventListener("click", () => {
        // Obtener la dificultad seleccionada
        const difficulty = document.querySelector('input[name="difficulty"]:checked').value

        // Preparar el mensaje con la configuración del juego
        let message =
            "¡Juego iniciado!\n" +
            "Modo: " +
            gameState.gameMode +
            "\n" +
            "Dificultad: " +
            difficulty +
            "\n" +
            "Categoría: " +
            gameState.cardCategory

        // Añadir información de los jugadores según el modo de juego
        if (gameState.gameMode === "twoPlayers") {
            const player1 = document.getElementById("username1").value || "Jugador 1"
            const player2 = document.getElementById("username2").value || "Jugador 2"
            message += "\nJugador 1: " + player1 + "\nJugador 2: " + player2
        } else {
            const player1 = document.getElementById("username1").value || "Jugador 1"
            message += "\nJugador: " + player1
        }

        // Mostrar el mensaje (en una implementación real, aquí iniciaríamos el juego)
        alert(message)
    })
}

