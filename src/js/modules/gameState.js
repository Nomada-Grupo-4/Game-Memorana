// Módulo para manejar el estado global del juego

// Objeto de estado del juego
export const gameState = {
  // Propiedades básicas
  isOpen: false,
  gameMode: "singlePlayer",
  cardCategory: "emojis",

  // Propiedades del juego (se usarán en game.js)
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
  difficulty: "medium",
  player1Name: "Jugador 1",
  player2Name: "Jugador 2",

  // Propiedades para la IA
  computerMemory: [],
  computerDelay: 1000,
  lastRevealedCards: [],

  // Propiedades del tablero
  gridCols: 4,
  gridRows: 3,
  hasSingleCard: false,

  // Métodos para la página de inicio
  init() {
    // Inicializar el estado del juego para la página de inicio
    this.isOpen = false
    this.gameMode = "singlePlayer"
    this.cardCategory = "emojis"

    // Reiniciar otras propiedades por si acaso
    this.flippedCards = []
    this.matchedPairs = 0
    this.isProcessing = false
    this.currentPlayer = 1
    this.player1Points = 0
    this.player2Points = 0
    this.computerMemory = []
    this.lastRevealedCards = []
  },

  setGameMode(mode) {
    this.gameMode = mode
    console.log("Modo de juego establecido:", mode)
  },

  setCardCategory(category) {
    this.cardCategory = category
    console.log("Categoría de cartas establecida:", category)
  },

  toggleOpen() {
    this.isOpen = !this.isOpen
    return this.isOpen
  },

  // Métodos para manipular el estado en el juego
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

    console.log("Estado del juego reiniciado")
  },

  addFlippedCard(card) {
    this.flippedCards.push(card)
    console.log("Carta añadida a flippedCards, total:", this.flippedCards.length)
  },

  clearFlippedCards() {
    this.flippedCards = []
    console.log("flippedCards limpiado")
  },

  incrementMatchedPairs() {
    this.matchedPairs++
    console.log("Pares encontrados incrementado a:", this.matchedPairs)
  },

  incrementPlayerPoints(playerNumber) {
    if (playerNumber === 1) {
      this.player1Points++
      document.getElementById("player1Points").textContent = this.player1Points
      console.log("Puntos del jugador 1 incrementados a:", this.player1Points)
    } else {
      this.player2Points++
      document.getElementById("player2Points").textContent = this.player2Points
      console.log("Puntos del jugador 2 incrementados a:", this.player2Points)
    }
  },

  toggleCurrentPlayer() {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1
    console.log("Jugador actual cambiado a:", this.currentPlayer)
  },

  addToComputerMemory(cardIndex, imageId) {
    if (!this.computerMemory.some((item) => item.index === cardIndex)) {
      this.computerMemory.push({ index: cardIndex, imageId: imageId })
      console.log("Carta añadida a la memoria de la computadora:", { index: cardIndex, imageId: imageId })
    }
  },

  setGameParameters(params) {
    this.gameMode = params.mode || "singlePlayer"
    this.difficulty = params.difficulty || "medium"
    this.cardCategory = params.category || "emojis"
    this.player1Name = params.player1 || "Jugador 1"
    this.player2Name = params.player2 || "Jugador 2"

    console.log("Parámetros del juego establecidos:", {
      gameMode: this.gameMode,
      difficulty: this.difficulty,
      cardCategory: this.cardCategory,
      player1Name: this.player1Name,
      player2Name: this.player2Name,
    })
  },
}

