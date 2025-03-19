// Módulo para manejar el estado global del juego

export const gameState = {
    isOpen: false,
    gameMode: "singlePlayer",
    cardCategory: "emojis",

    init() {
        // Inicializar el estado del juego
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
}

