// Módulo para manejar el tablero de juego
import { gameState } from "./gameState.js"
import { loadCardImages } from "./cardLoader.js"
import { showVictoryModal } from "./modals.js"
import { updateCurrentPlayerIndicator } from "./gameUI.js"
import { computerPlay } from "./computerAI.js"

// Configurar el tablero según la dificultad
export function setupGameBoard() {
  const gameBoard = document.getElementById("gameBoard")
  let gridCols, gridRows

  // Configurar el tamaño del tablero según la dificultad
  switch (gameState.difficulty) {
    case "easy":
      gridCols = 4 // 3x4 = 12 cartas (6 pares)
      gridRows = 3
      break
    case "medium":
      gridCols = 4 // 4x4 = 16 cartas (8 pares)
      gridRows = 4
      break
    case "hard":
      gridCols = 5 // 4x5 = 20 cartas (10 pares)
      gridRows = 4
      break
    default:
      gridCols = 4
      gridRows = 3
  }

  // Configurar el estilo del tablero según el tamaño
  gameBoard.style.gridTemplateColumns = `repeat(${gridCols}, 1fr)`

  // Calcular el número total de pares
  gameState.totalPairs = (gridCols * gridRows) / 2
  gameState.hasSingleCard = false

  // Guardar las dimensiones del tablero
  gameState.gridCols = gridCols
  gameState.gridRows = gridRows

  console.log(`Tablero configurado: ${gridCols}x${gridRows}, Total de pares: ${gameState.totalPairs}`)

  // Cargar las imágenes de las cartas
  loadCardImages()
}

// Función para voltear una carta
export function flipCard(card) {
  console.log("Intentando voltear carta:", card.dataset.index)

  // Si ya está procesando una jugada, está volteada o ya está emparejada, no hacer nada
  if (gameState.isProcessing || gameState.flippedCards.includes(card) || card.classList.contains("matched")) {
    console.log("No se puede voltear la carta (procesando, ya volteada o emparejada)")
    return
  }

  // Si es el turno de la computadora y estamos en modo vs Computadora, no permitir voltear
  if (gameState.gameMode === "vsComputer" && gameState.currentPlayer === 2) {
    console.log("Es el turno de la computadora, el jugador no puede voltear")
    return
  }

  // Voltear la carta
  card.classList.add("flipped")
  gameState.addFlippedCard(card)
  console.log("Carta volteada:", card.dataset.index)

  // Guardar la carta en la memoria de la computadora
  if (gameState.gameMode === "vsComputer") {
    const cardIndex = Number.parseInt(card.dataset.index)
    const imageId = card.dataset.imageId
    gameState.addToComputerMemory(cardIndex, imageId)
  }

  // Si ya hay dos cartas volteadas, verificar si son iguales
  if (gameState.flippedCards.length === 2) {
    gameState.isProcessing = true
    console.log("Dos cartas volteadas, verificando si son iguales")

    // Verificar si las cartas son iguales
    const card1 = gameState.flippedCards[0]
    const card2 = gameState.flippedCards[1]

    if (card1.dataset.imageId === card2.dataset.imageId) {
      // Las cartas son iguales
      console.log("Las cartas son iguales")
      setTimeout(() => {
        card1.classList.add("matched")
        card2.classList.add("matched")

        // Actualizar puntuación
        gameState.incrementPlayerPoints(gameState.currentPlayer)
        console.log(
          `Jugador ${gameState.currentPlayer} incrementa puntos:`,
          gameState.currentPlayer === 1 ? gameState.player1Points : gameState.player2Points,
        )

        // Incrementar el contador de pares encontrados
        gameState.incrementMatchedPairs()
        console.log("Pares encontrados:", gameState.matchedPairs, "de", gameState.totalPairs)

        // Reiniciar para la siguiente jugada
        gameState.clearFlippedCards()
        gameState.isProcessing = false

        // Verificar si se han encontrado todos los pares
        if (gameState.matchedPairs === gameState.totalPairs) {
          console.log("¡Juego completado!")
          clearInterval(gameState.timer)
          showVictoryModal()
        } else if (gameState.gameMode === "vsComputer" && gameState.currentPlayer === 2) {
          // Si la computadora acierta, sigue jugando
          console.log("La computadora acierta, sigue jugando")
          setTimeout(() => computerPlay(), gameState.computerDelay)
        }
      }, 500)
    } else {
      // Las cartas no son iguales
      console.log("Las cartas no son iguales")
      setTimeout(() => {
        card1.classList.remove("flipped")
        card2.classList.remove("flipped")

        // Cambiar de jugador si estamos en modo de 2 jugadores o vs Computadora
        if (gameState.gameMode === "twoPlayers" || gameState.gameMode === "vsComputer") {
          gameState.toggleCurrentPlayer()
          console.log("Cambio de jugador, ahora es el turno del jugador", gameState.currentPlayer)
          updateCurrentPlayerIndicator()

          // Si es el turno de la computadora, hacer que juegue
          if (gameState.gameMode === "vsComputer" && gameState.currentPlayer === 2) {
            console.log("Ahora es el turno de la computadora")
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

