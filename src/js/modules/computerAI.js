// Módulo para la inteligencia artificial de la computadora
import { gameState } from "./gameState.js"

// Función para la jugada de la computadora
export function computerPlay() {
  console.log("Turno de la computadora")

  if (gameState.matchedPairs === gameState.totalPairs) return

  // Buscar pares en la memoria
  let foundPair = false
  let firstCardIndex = -1
  let secondCardIndex = -1

  // Primero intentar encontrar un par en la memoria
  for (let i = 0; i < gameState.computerMemory.length; i++) {
    for (let j = i + 1; j < gameState.computerMemory.length; j++) {
      if (
        gameState.computerMemory[i].imageId === gameState.computerMemory[j].imageId &&
        !gameState.cards[gameState.computerMemory[i].index].classList.contains("matched") &&
        !gameState.cards[gameState.computerMemory[j].index].classList.contains("flipped")
      ) {
        foundPair = true
        firstCardIndex = gameState.computerMemory[i].index
        secondCardIndex = gameState.computerMemory[j].index
        console.log("La computadora encontró un par:", firstCardIndex, secondCardIndex)
        break
      }
    }
    if (foundPair) break
  }

  // Si no se encontró un par, elegir cartas al azar
  if (!foundPair) {
    console.log("La computadora no encontró pares, eligiendo al azar")
    // Obtener cartas que no están emparejadas
    const availableCards = gameState.cards.filter(
      (card) => !card.classList.contains("matched") && !card.classList.contains("flipped"),
    )

    if (availableCards.length >= 2) {
      // Elegir dos cartas al azar
      const randomIndexes = getRandomIndexes(0, availableCards.length - 1, 2)
      firstCardIndex = Number.parseInt(availableCards[randomIndexes[0]].dataset.index)
      secondCardIndex = Number.parseInt(availableCards[randomIndexes[1]].dataset.index)
      console.log("Cartas aleatorias seleccionadas:", firstCardIndex, secondCardIndex)
    }
  }

  // Voltear las cartas seleccionadas
  if (firstCardIndex !== -1 && secondCardIndex !== -1) {
    console.log("La computadora volteará las cartas:", firstCardIndex, secondCardIndex)

    // Simular el clic en la primera carta
    setTimeout(() => {
      if (gameState.cards[firstCardIndex]) {
        console.log("Volteando primera carta:", firstCardIndex)
        simulateCardClick(gameState.cards[firstCardIndex])

        // Simular el clic en la segunda carta después de un breve retraso
        setTimeout(() => {
          if (gameState.cards[secondCardIndex]) {
            console.log("Volteando segunda carta:", secondCardIndex)
            simulateCardClick(gameState.cards[secondCardIndex])
          }
        }, 600)
      }
    }, 500)
  } else {
    console.log("No se pudieron seleccionar cartas para la computadora")
    // Si por alguna razón no se pudieron seleccionar cartas, pasar el turno al jugador
    gameState.toggleCurrentPlayer()
  }
}

// Función para simular un clic en una carta
function simulateCardClick(card) {
  // Verificar si la carta existe y no está volteada o emparejada
  if (card && !card.classList.contains("flipped") && !card.classList.contains("matched")) {
    // Voltear la carta directamente
    card.classList.add("flipped")
    gameState.addFlippedCard(card)

    // Si ya hay dos cartas volteadas, procesar la jugada
    if (gameState.flippedCards.length === 2) {
      processComputerMove()
    }
  }
}

// Procesar la jugada de la computadora
function processComputerMove() {
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
      gameState.incrementPlayerPoints(2) // La computadora es el jugador 2

      // Incrementar el contador de pares encontrados
      gameState.incrementMatchedPairs()

      // Reiniciar para la siguiente jugada
      gameState.clearFlippedCards()
      gameState.isProcessing = false

      // Verificar si se han encontrado todos los pares
      if (gameState.matchedPairs === gameState.totalPairs) {
        clearInterval(gameState.timer)
        showVictoryModal()
      } else {
        // Si la computadora acierta, sigue jugando
        setTimeout(() => computerPlay(), gameState.computerDelay)
      }
    }, 500)
  } else {
    // Las cartas no son iguales
    setTimeout(() => {
      card1.classList.remove("flipped")
      card2.classList.remove("flipped")

      // Cambiar al turno del jugador
      gameState.toggleCurrentPlayer()
      updateCurrentPlayerIndicator()

      // Reiniciar para la siguiente jugada
      gameState.clearFlippedCards()
      gameState.isProcessing = false
    }, 1000)
  }
}

// Función para obtener índices aleatorios únicos
function getRandomIndexes(min, max, count) {
  const indexes = []
  while (indexes.length < count) {
    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min
    if (!indexes.includes(randomIndex)) {
      indexes.push(randomIndex)
    }
  }
  return indexes
}

// Actualizar la memoria de la computadora
export function updateComputerMemory(card) {
  const cardIndex = Number.parseInt(card.dataset.index)
  const imageId = card.dataset.imageId

  gameState.addToComputerMemory(cardIndex, imageId)
  console.log("Memoria de la computadora actualizada:", gameState.computerMemory)
}

// Importar las funciones necesarias
import { showVictoryModal } from "./modals.js"
import { updateCurrentPlayerIndicator } from "./gameUI.js"

