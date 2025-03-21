import { getTimeLimit } from "./modules/timer.js"
import { setupModalButtons } from "./modules/modals.js"
import { setupGameInfo } from "./modules/gameUI.js"

// Objeto de estado del juego que agrupa todas las variables globales
export const gameState = {
  // Propiedades del juego
  timer: null,
  timeLeft: 0,
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  totalPairs: 0,
  isProcessing: false,
  currentPlayer: 1,
  player1Points: 0,
  player2Points: 0,

  // Configuración del juego
  gameMode: "singlePlayer",
  difficulty: "medium",
  cardCategory: "emojis",
  player1Name: "Jugador 1",
  player2Name: "Jugador 2",

  // Propiedades para la IA
  computerMemory: [],
  computerDelay: 1000,
  lastRevealedCards: [],

  // Métodos para manipular el estado
  resetGame() {
    this.flippedCards = []
    this.matchedPairs = 0
    this.isProcessing = false
    this.currentPlayer = 1
    this.player1Points = 0
    this.player2Points = 0
    this.computerMemory = []
    this.lastRevealedCards = []

    // Actualizar puntuaciones en la UI
    document.getElementById("player1Points").textContent = "0"
    document.getElementById("player2Points").textContent = "0"
  },

  addFlippedCard(card) {
    this.flippedCards.push(card)
  },

  clearFlippedCards() {
    this.flippedCards = []
  },

  incrementMatchedPairs() {
    this.matchedPairs++
  },

  incrementPlayerPoints(playerNumber) {
    if (playerNumber === 1) {
      this.player1Points++
      document.getElementById("player1Points").textContent = this.player1Points
    } else {
      this.player2Points++
      document.getElementById("player2Points").textContent = this.player2Points
    }
  },

  toggleCurrentPlayer() {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1
  },

  addToComputerMemory(cardIndex, imageId) {
    if (!this.computerMemory.some((item) => item.index === cardIndex)) {
      this.computerMemory.push({ index: cardIndex, imageId: imageId })
    }
  },

  setGameParameters(params) {
    this.gameMode = params.mode || "singlePlayer"
    this.difficulty = params.difficulty || "medium"
    this.cardCategory = params.category || "emojis"
    this.player1Name = params.player1 || "Jugador 1"
    this.player2Name = params.player2 || "Jugador 2"
  },
}

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
  setupGameBoardFunc()

  // Cargar las imágenes de las cartas
  loadCardImages()

  // Configurar los botones de los modales
  setupModalButtons()
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
  updateCurrentPlayerIndicatorFunc()

  // Recargar las cartas
  loadCardImages()

  // Reiniciar el temporizador
  gameState.timeLeft = getTimeLimit()
  updateTimerFunc()
  startTimerFunc()
}

// Volver al menú principal
export function goToMenu() {
  window.location.href = "index.html"
}

// Configurar la información del juego
function setupGameInfo() {
  const gameInfo = document.getElementById("gameInfo")
  const player1NameElement = document.getElementById("player1Name")
  const player2NameElement = document.getElementById("player2Name")
  const player2Score = document.getElementById("player2Score")

  player1NameElement.textContent = gameState.player1Name

  let infoText = `Dificultad: ${getDifficultyText(gameState.difficulty)} | Categoría: ${getCategoryText(gameState.cardCategory)}`

  if (gameState.gameMode === "twoPlayers") {
    player2NameElement.textContent = gameState.player2Name
    player2Score.classList.remove("hidden")
    infoText = `Modo: 2 Jugadores | ${infoText}`
  } else if (gameState.gameMode === "vsComputer") {
    player2NameElement.textContent = "Computadora"
    player2Score.classList.remove("hidden")
    infoText = `Modo: Contra la PC | ${infoText}`
  } else {
    infoText = `Modo: 1 Jugador | ${infoText}`
  }

  gameInfo.textContent = infoText
}

// Obtener el texto de la dificultad
function getDifficultyText(difficulty) {
  switch (difficulty) {
    case "easy":
      return "Fácil"
    case "medium":
      return "Medio"
    case "hard":
      return "Difícil"
    default:
      return "Medio"
  }
}

// Obtener el texto de la categoría
function getCategoryText(category) {
  switch (category) {
    case "emojis":
      return "Emojis"
    case "animals":
      return "Animales"
    case "tech":
      return "Tecnología"
    default:
      return "Emojis"
  }
}

// Configurar el tablero según la dificultad
function setupGameBoardFunc() {
  const gameBoard = document.getElementById("gameBoard")
  let gridSize, timeLimit

  // Configurar el tamaño del tablero y el tiempo según la dificultad
  switch (gameState.difficulty) {
    case "easy":
      gridSize = 4 // 4x4 = 16 cartas (8 pares)
      timeLimit = 60 // 1 minuto
      break
    case "medium":
      gridSize = 6 // 6x6 = 36 cartas (18 pares)
      timeLimit = 120 // 2 minutos
      break
    case "hard":
      gridSize = 8 // 8x8 = 64 cartas (32 pares)
      timeLimit = 180 // 3 minutos
      break
    default:
      gridSize = 6
      timeLimit = 120
  }

  // Configurar el temporizador
  gameState.timeLeft = timeLimit
  updateTimerFunc()
  startTimerFunc()

  // Configurar el estilo del tablero según el tamaño
  gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`

  // Calcular el número total de pares
  gameState.totalPairs = (gridSize * gridSize) / 2
}

// Cargar las imágenes de las cartas desde el JSON
function loadCardImages() {
  // URL del JSON según la categoría seleccionada
  const jsonUrl = `/src/data/${gameState.cardCategory}.json`

  fetch(jsonUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo cargar el archivo JSON")
      }
      return response.json()
    })
    .then((data) => {
      createCardsWithImages(data.images)
    })
    .catch((error) => {
      console.error("Error al cargar las imágenes:", error)
      // Usar imágenes de respaldo en caso de error
      createCardsWithFallback()
    })
}

// Crear las cartas con las imágenes cargadas
function createCardsWithImages(images) {
  const gameBoard = document.getElementById("gameBoard")
  let gridSize

  // Determinar el tamaño del tablero según la dificultad
  switch (gameState.difficulty) {
    case "easy":
      gridSize = 4
      break
    case "medium":
      gridSize = 6
      break
    case "hard":
      gridSize = 8
      break
    default:
      gridSize = 6
  }

  // Calcular cuántas imágenes necesitamos (la mitad del total de cartas)
  const neededPairs = (gridSize * gridSize) / 2

  // Si no hay suficientes imágenes, usar las que hay y repetir si es necesario
  let selectedImages = []
  while (selectedImages.length < neededPairs) {
    selectedImages = selectedImages.concat(
      images.slice(0, Math.min(neededPairs - selectedImages.length, images.length)),
    )
  }

  // Duplicar las imágenes para crear pares
  let cardImages = [...selectedImages, ...selectedImages]

  // Mezclar las cartas
  cardImages = shuffleArray(cardImages)

  // Crear el HTML para cada carta
  gameBoard.innerHTML = ""
  gameState.cards = []

  cardImages.forEach((image, index) => {
    const card = document.createElement("div")
    card.className = "card aspect-square cursor-pointer"
    card.dataset.index = index
    card.dataset.imageId = image.id || index % neededPairs

    // Calcular el tamaño de la carta según la dificultad
    let cardSize
    switch (gameState.difficulty) {
      case "easy":
        cardSize = "h-[70px] md:h-[100px]"
        break
      case "medium":
        cardSize = "h-[60px] md:h-[80px]"
        break
      case "hard":
        cardSize = "h-[45px] md:h-[65px]"
        break
      default:
        cardSize = "h-[60px] md:h-[80px]"
    }

    card.innerHTML = `
      <div class="card-inner w-full h-full">
        <div class="card-front ${cardSize} bg-white flex items-center justify-center">
          <img src="${image.url}" alt="Card" class="max-w-full max-h-full p-1">
        </div>
        <div class="card-back ${cardSize} flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
      </div>
    `

    // Agregar evento de clic a la carta
    card.addEventListener("click", () => flipCardFunc(card))

    // Agregar la carta al tablero
    gameBoard.appendChild(card)
    gameState.cards.push(card)
  })
}

// Crear cartas con imágenes de respaldo en caso de error
function createCardsWithFallback() {
  const gameBoard = document.getElementById("gameBoard")
  let gridSize

  // Determinar el tamaño del tablero según la dificultad
  switch (gameState.difficulty) {
    case "easy":
      gridSize = 4
      break
    case "medium":
      gridSize = 6
      break
    case "hard":
      gridSize = 8
      break
    default:
      gridSize = 6
  }

  // Calcular cuántas imágenes necesitamos (la mitad del total de cartas)
  const neededPairs = (gridSize * gridSize) / 2

  // Crear un array con números del 1 al número de pares necesarios
  const cardValues = Array.from({ length: neededPairs }, (_, i) => i + 1)

  // Duplicar los valores para crear pares
  let allCardValues = [...cardValues, ...cardValues]

  // Mezclar las cartas
  allCardValues = shuffleArray(allCardValues)

  // Crear el HTML para cada carta
  gameBoard.innerHTML = ""
  gameState.cards = []

  allCardValues.forEach((value, index) => {
    const card = document.createElement("div")
    card.className = "card aspect-square cursor-pointer"
    card.dataset.index = index
    card.dataset.imageId = value

    // Calcular el tamaño de la carta según la dificultad
    let cardSize
    switch (gameState.difficulty) {
      case "easy":
        cardSize = "h-[70px] md:h-[100px]"
        break
      case "medium":
        cardSize = "h-[60px] md:h-[80px]"
        break
      case "hard":
        cardSize = "h-[45px] md:h-[65px]"
        break
      default:
        cardSize = "h-[60px] md:h-[80px]"
    }

    // Usar emojis como respaldo según la categoría
    let emoji
    switch (gameState.cardCategory) {
      case "animals":
        emoji = [
          "🐶",
          "🐱",
          "🐭",
          "🐹",
          "🐰",
          "🦊",
          "🐻",
          "🐼",
          "🐨",
          "🐯",
          "🦁",
          "🐮",
          "🐷",
          "🐸",
          "🐵",
          "🐔",
          "🐧",
          "🐦",
          "🦆",
          "🦅",
          "🦉",
          "🦇",
          "🐺",
          "🐗",
          "🐴",
          "🦄",
          "🐝",
          "🐛",
          "🦋",
          "🐌",
          "🐞",
          "🐜",
        ][value % 32]
        break
      case "tech":
        emoji = [
          "📱",
          "💻",
          "⌨️",
          "🖥️",
          "🖨️",
          "🖱️",
          "💽",
          "💾",
          "💿",
          "📀",
          "🎮",
          "🎧",
          "📷",
          "📹",
          "🔋",
          "🔌",
          "📺",
          "📻",
          "⏰",
          "🔍",
          "🔭",
          "🔬",
          "📡",
          "🛰️",
          "📠",
          "📟",
          "📞",
          "☎️",
          "📲",
          "📓",
          "📔",
          "📕",
        ][value % 32]
        break
      default: // emojis
        emoji = [
          "😀",
          "😃",
          "😄",
          "😁",
          "😆",
          "😅",
          "😂",
          "🤣",
          "😊",
          "😇",
          "🙂",
          "🙃",
          "😉",
          "😌",
          "😍",
          "🥰",
          "😘",
          "😗",
          "😙",
          "😚",
          "😋",
          "😛",
          "😝",
          "😜",
          "🤪",
          "🤨",
          "🧐",
          "🤓",
          "😎",
          "🤩",
          "🥳",
          "😏",
        ][value % 32]
    }

    card.innerHTML = `
      <div class="card-inner w-full h-full">
        <div class="card-front ${cardSize} bg-white flex items-center justify-center">
          <span class="text-4xl">${emoji}</span>
        </div>
        <div class="card-back ${cardSize} flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
      </div>
    `

    // Agregar evento de clic a la carta
    card.addEventListener("click", () => flipCardFunc(card))

    // Agregar la carta al tablero
    gameBoard.appendChild(card)
    gameState.cards.push(card)
  })
}

// Función para voltear una carta
function flipCardFunc(card) {
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

    // Guardar las últimas cartas reveladas
    gameState.lastRevealedCards = [...gameState.flippedCards]

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
          showVictoryModalFunc()
        } else if (gameState.gameMode === "vsComputer" && gameState.currentPlayer === 2) {
          // Si la computadora acierta, sigue jugando
          setTimeout(() => computerPlayFunc(), gameState.computerDelay)
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
          updateCurrentPlayerIndicatorFunc()

          // Si es el turno de la computadora, hacer que juegue
          if (gameState.gameMode === "vsComputer" && gameState.currentPlayer === 2) {
            setTimeout(() => computerPlayFunc(), gameState.computerDelay)
          }
        }

        // Reiniciar para la siguiente jugada
        gameState.clearFlippedCards()
        gameState.isProcessing = false
      }, 1000)
    }
  }
}

// Actualizar el indicador del jugador actual
function updateCurrentPlayerIndicatorFunc() {
  const player1Score = document.getElementById("player1Score")
  const player2Score = document.getElementById("player2Score")

  if (gameState.currentPlayer === 1) {
    player1Score.classList.add("pulse")
    player2Score.classList.remove("pulse")
  } else {
    player1Score.classList.remove("pulse")
    player2Score.classList.add("pulse")
  }
}

// Función para la jugada de la computadora
function computerPlayFunc() {
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
      flipCardFunc(gameState.cards[firstCardIndex])
      setTimeout(() => {
        flipCardFunc(gameState.cards[secondCardIndex])
      }, 500)
    }, 500)
  }
}

// Iniciar el temporizador
function startTimerFunc() {
  gameState.timer = setInterval(() => {
    gameState.timeLeft--
    updateTimerFunc()

    if (gameState.timeLeft <= 0) {
      clearInterval(gameState.timer)
      showGameOverModalFunc()
    }
  }, 1000)
}

// Actualizar el temporizador en la interfaz
function updateTimerFunc() {
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

// Mostrar el modal de victoria
function showVictoryModalFunc() {
  const victoryModal = document.getElementById("victoryModal")
  const victoryMessage = document.getElementById("victoryMessage")

  // Personalizar el mensaje según el modo de juego
  if (gameState.gameMode === "twoPlayers") {
    if (gameState.player1Points > gameState.player2Points) {
      victoryMessage.textContent = `¡${gameState.player1Name} ha ganado con ${gameState.player1Points} pares encontrados!`
    } else if (gameState.player2Points > gameState.player1Points) {
      victoryMessage.textContent = `¡${gameState.player2Name} ha ganado con ${gameState.player2Points} pares encontrados!`
    } else {
      victoryMessage.textContent = `¡Empate! Ambos jugadores encontraron ${gameState.player1Points} pares.`
    }
  } else if (gameState.gameMode === "vsComputer") {
    if (gameState.player1Points > gameState.player2Points) {
      victoryMessage.textContent = `¡Has ganado a la computadora con ${gameState.player1Points} pares encontrados!`
    } else if (gameState.player2Points > gameState.player1Points) {
      victoryMessage.textContent = `La computadora ha ganado con ${gameState.player2Points} pares encontrados.`
    } else {
      victoryMessage.textContent = `¡Empate! Ambos encontraron ${gameState.player1Points} pares.`
    }
  } else {
    victoryMessage.textContent = `¡Has completado el juego con ${gameState.timeLeft} segundos restantes!`
  }

  // Mostrar el modal
  victoryModal.classList.add("opacity-100")
  victoryModal.classList.remove("pointer-events-none")
}

// Mostrar el modal de game over
function showGameOverModalFunc() {
  const gameOverModal = document.getElementById("gameOverModal")
  const gameOverMessage = document.getElementById("gameOverMessage")

  // Personalizar el mensaje según el modo de juego
  if (gameState.gameMode === "twoPlayers" || gameState.gameMode === "vsComputer") {
    if (gameState.player1Points > gameState.player2Points) {
      gameOverMessage.textContent = `Tiempo agotado. ¡${gameState.player1Name} ha ganado con ${gameState.player1Points} pares encontrados!`
    } else if (gameState.player2Points > gameState.player1Points) {
      gameOverMessage.textContent = `Tiempo agotado. ¡${gameState.gameMode === "vsComputer" ? "La computadora" : gameState.player2Name} ha ganado con ${gameState.player2Points} pares encontrados!`
    } else {
      gameOverMessage.textContent = `Tiempo agotado. ¡Empate! Ambos encontraron ${gameState.player1Points} pares.`
    }
  } else {
    gameOverMessage.textContent = `Se acabó el tiempo. Has encontrado ${gameState.player1Points} de ${gameState.totalPairs} pares.`
  }

  // Mostrar el modal
  gameOverModal.classList.add("opacity-100")
  gameOverModal.classList.remove("pointer-events-none")
}

// Configurar los botones de los modales
function setupModalButtons() {
  // Botones del modal de victoria
  document.getElementById("playAgainBtn").addEventListener("click", restartGame)
  document.getElementById("backToMenuBtn").addEventListener("click", goToMenu)

  // Botones del modal de game over
  document.getElementById("tryAgainBtn").addEventListener("click", restartGame)
  document.getElementById("backToMenuBtnGameOver").addEventListener("click", goToMenu)
}

// Función para mezclar un array (algoritmo Fisher-Yates)
function shuffleArray(array) {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
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

