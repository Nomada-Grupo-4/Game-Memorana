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
  
    // Métodos para la página de inicio
    init() {
      // Inicializar el estado del juego para la página de inicio
      this.isOpen = false
      this.gameMode = "singlePlayer"
      this.cardCategory = "emojis"
    },
  
    setGameMode(mode) {
      this.gameMode = mode
    },
  
    setCardCategory(category) {
      this.cardCategory = category
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
  
  