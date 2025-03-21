// Módulo para cargar las imágenes de las cartas
import { gameState } from "../game.js"
import { shuffleArray } from "./gameBoard.js"
import { flipCard } from "../game.js"

// Cargar las imágenes de las cartas desde el JSON
export function loadCardImages() {
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
      prepareCardImages(data.images)
    })
    .catch((error) => {
      console.error("Error al cargar las imágenes:", error)
      // Usar imágenes de respaldo en caso de error
      createCardsWithFallback()
    })
}

// Preparar las imágenes para las cartas
function prepareCardImages(images) {
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

  // Crear las cartas
  createCards(cardImages)
}

// Crear las cartas con las imágenes cargadas
function createCards(cardImages) {
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

  // Crear el HTML para cada carta
  gameBoard.innerHTML = ""
  gameState.cards = []

  cardImages.forEach((image, index) => {
    const card = document.createElement("div")
    card.className = "card aspect-square cursor-pointer"
    card.dataset.index = index
    card.dataset.imageId = image.id || index % (cardImages.length / 2)

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
                    ${image.url ? `<img src="${image.url}" alt="Card" class="max-w-full max-h-full p-1">` : `<span class="text-4xl">${image.emoji || "?"}</span>`}
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
    card.addEventListener("click", () => flipCard(card))

    // Agregar la carta al tablero
    gameBoard.appendChild(card)
    gameState.cards.push(card)
  })
}

// Crear cartas con imágenes de respaldo en caso de error
export function createCardsWithFallback() {
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

  // Crear un array de objetos con emojis según la categoría
  const cardImages = allCardValues.map((value) => {
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

    return {
      id: value,
      emoji: emoji,
    }
  })

  // Crear las cartas
  createCards(cardImages)
}

