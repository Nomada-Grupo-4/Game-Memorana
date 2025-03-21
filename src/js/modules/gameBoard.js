// Módulo para manejar el tablero de juego
import { gameState } from "../game.js"
import { loadCardImages } from "./cardLoader.js"
import { showVictoryModal } from "./modals.js"
import { updateCurrentPlayerIndicator } from "./gameUI.js"
import { computerPlay } from "./computerAI.js"

// Configurar el tablero según la dificultad
export function setupGameBoard() {
  const gameBoard = document.getElementById("gameBoard")
  let gridSize

  // Configurar el tamaño del tablero según la dificultad
  switch (gameState.difficulty) {
    case "easy":
      gridSize = 4 // 4x4 = 16 cartas (8 pares)
      break
    case "medium":
      gridSize = 6 // 6x6 = 36 cartas (18 pares)
      break
    case "hard":
      gridSize = 8 // 8x8 = 64 cartas (32 pares)
      break
    default:
      gridSize = 6
  }

  // Configurar el estilo del tablero según el tamaño
  gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`

  // Calcular el número total de pares
  gameState.totalPairs = (gridSize * gridSize) / 2

  // Cargar las imágenes de las cartas
  loadCardImages()
}

// Función para voltear una carta
export function flipCard(card) {
  // Si ya está procesando una jugada, está volteada o ya está emparejada, no hacer nada
  if (gameState.isProcessing || gameState.flippedCards.includes(card) || card.classList.contains("matched")) {
    return
  }

  // Si es el turno de la computadora y estamos en modo vs Computadora, no permitir voltear
  if (gameState.gameMode === "vsComputer" && gameState.currentPlayer === 2) {
    return
  }

  // Voltear la carta
  card.classList.add("flipped")
  gameState.addFlippedCard(card)

  // Guardar la carta en la memoria de la computadora
  if (gameState.gameMode === "vsComputer") {
    const cardIndex = Number.parseInt(card.dataset.index)
    const imageId = card.dataset.imageId
    gameState.addToComputerMemory(cardIndex, imageId)
  }

  // Si ya hay dos cartas volteadas, verificar si son iguales
  if (gameState.flippedCards.length === 2) {
    gameState.isProcessing = true

    // Verificar si las cartas son iguales
    const card1 = gameState.flippedCards[0]
    const card2 = gameState.flippedCards[1]

    if (card1.dataset.imageId === card2.dataset.imageId) {
      // Las cartas son iguales
      setTimeout(() => {
        card1.classList.add("matched")
        card2.classList.add("matched")

        // Actualizar puntuación
        gameState.incrementPlayerPoints(gameState.currentPlayer)

        // Incrementar el contador de pares encontrados
        gameState.incrementMatchedPairs()

        // Reiniciar para la siguiente jugada
        gameState.clearFlippedCards()
        gameState.isProcessing = false

        // Verificar si se han encontrado todos los pares
        if (gameState.matchedPairs === gameState.totalPairs) {
          clearInterval(gameState.timer)
          showVictoryModal()
        } else if (gameState.gameMode === "vsComputer" && gameState.currentPlayer === 2) {
          // Si la computadora acierta, sigue jugando
          setTimeout(() => computerPlay(), gameState.computerDelay)
        }
      }, 500)
    } else {
      // Las cartas no son iguales
      setTimeout(() => {
        card1.classList.remove("flipped")
        card2.classList.remove("flipped")

        // Cambiar de jugador si estamos en modo de 2 jugadores o vs Computadora
        if (gameState.gameMode === "twoPlayers" || gameState.gameMode === "vsComputer") {
          gameState.toggleCurrentPlayer()
          updateCurrentPlayerIndicator()

          // Si es el turno de la computadora, hacer que juegue
          if (gameState.gameMode === "vsComputer" && gameState.currentPlayer === 2) {
            setTimeout(() => computerPlay(), gameState.computerDelay)
          }
        }

        // Reiniciar para la siguiente jugada
        gameState.clearFlippedCards()
        gameState.isProcessing = false
      }, 1000)
    }
  }
}

// Función para mezclar un array (algoritmo Fisher-Yates)
export function shuffleArray(array) {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

