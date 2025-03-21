// Módulo para la inteligencia artificial de la computadora
import { gameState } from "../game.js"
import { flipCard } from "./gameBoard.js"

// Función para la jugada de la computadora
export function computerPlay() {
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
        !gameState.cards[gameState.computerMemory[j].index].classList.contains("matched")
      ) {
        foundPair = true
        firstCardIndex = gameState.computerMemory[i].index
        secondCardIndex = gameState.computerMemory[j].index
        break
      }
    }
    if (foundPair) break
  }

  // Si no se encontró un par, elegir cartas al azar
  if (!foundPair) {
    // Obtener cartas que no están emparejadas
    const availableCards = gameState.cards.filter(
      (card) => !card.classList.contains("matched") && !card.classList.contains("flipped"),
    )

    if (availableCards.length >= 2) {
      // Elegir dos cartas al azar
      const randomIndexes = getRandomIndexes(0, availableCards.length - 1, 2)
      firstCardIndex = Number.parseInt(availableCards[randomIndexes[0]].dataset.index)
      secondCardIndex = Number.parseInt(availableCards[randomIndexes[1]].dataset.index)
    }
  }

  // Voltear las cartas seleccionadas
  if (firstCardIndex !== -1 && secondCardIndex !== -1) {
    setTimeout(() => {
      flipCard(gameState.cards[firstCardIndex])
      setTimeout(() => {
        flipCard(gameState.cards[secondCardIndex])
      }, 500)
    }, 500)
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
}

