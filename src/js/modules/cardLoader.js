// Módulo para cargar las imágenes de las cartas
import { gameState } from "./gameState.js"
import { shuffleArray } from "./gameBoard.js"
import { flipCard } from "./gameBoard.js"

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
  // Calcular cuántas imágenes necesitamos (la mitad del total de cartas)
  const totalCards = gameState.gridCols * gameState.gridRows
  const neededPairs = totalCards / 2

  console.log(`Preparando imágenes: Necesitamos ${neededPairs} pares para un tablero de ${totalCards} cartas`)

  // Si no hay suficientes imágenes, usar las que hay y repetir si es necesario
  let selectedImages = []
  while (selectedImages.length < neededPairs) {
    selectedImages = selectedImages.concat(
      images.slice(0, Math.min(neededPairs - selectedImages.length, images.length)),
    )
  }

  // Duplicar las imágenes para crear pares
  let cardImages = []
  selectedImages.forEach((img) => {
    cardImages.push({ ...img })
    cardImages.push({ ...img })
  })

  // Mezclar las cartas
  cardImages = shuffleArray(cardImages)

  // Crear las cartas
  createCards(cardImages)
}

// Crear las cartas con las imágenes cargadas
function createCards(cardImages) {
  const gameBoard = document.getElementById("gameBoard")

  // Configurar el estilo del tablero según el tamaño
  gameBoard.style.gridTemplateColumns = `repeat(${gameState.gridCols}, 1fr)`

  // Crear el HTML para cada carta
  gameBoard.innerHTML = ""
  gameState.cards = []

  cardImages.forEach((image, index) => {
    const card = document.createElement("div")
    card.className = "card"
    card.dataset.index = index
    card.dataset.imageId = image.id || index % (cardImages.length / 2)

    card.innerHTML = `
            <div class="card-inner w-full h-full">
                <div class="card-front bg-white flex items-center justify-center">
                    ${image.url ? `<img src="${image.url}" alt="Card" class="max-w-[80%] max-h-[80%]">` : `<span class="text-4xl">${image.emoji || "?"}</span>`}
                </div>
                <div class="card-back flex items-center justify-center">
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

  // Ajustar el tamaño del tablero para dispositivos móviles
  adjustBoardSize()

  // Escuchar cambios en el tamaño de la ventana
  window.addEventListener("resize", adjustBoardSize)
}

// Función para ajustar el tamaño del tablero
function adjustBoardSize() {
  const gameBoard = document.getElementById("gameBoard")
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  // Calcular el tamaño máximo que puede tener el tablero
  const headerHeight = 150 // Altura aproximada del encabezado
  const maxBoardHeight = windowHeight - headerHeight - 40 // 40px de margen

  // Limitar el ancho máximo del tablero
  const maxBoardWidth = Math.min(windowWidth - 40, 800) // 40px de margen, máximo 800px

  // Establecer el ancho del tablero
  gameBoard.style.maxWidth = `${maxBoardWidth}px`

  // Ajustar el tamaño de las cartas para dispositivos móviles
  if (windowWidth < 640) {
    gameBoard.style.gap = "4px"
    gameBoard.style.padding = "4px"
  } else {
    gameBoard.style.gap = "8px"
    gameBoard.style.padding = "10px"
  }
}

// Crear cartas con imágenes de respaldo en caso de error
export function createCardsWithFallback() {
  // Calcular cuántas imágenes necesitamos (la mitad del total de cartas)
  const totalCards = gameState.gridCols * gameState.gridRows
  const neededPairs = totalCards / 2

  // Crear un array con números del 1 al número de pares necesarios
  const cardValues = Array.from({ length: neededPairs }, (_, i) => i + 1)

  // Duplicar los valores para crear pares
  let allCardValues = []
  cardValues.forEach((value) => {
    allCardValues.push(value)
    allCardValues.push(value)
  })

  // Mezclar las cartas
  allCardValues = shuffleArray(allCardValues)

  // Crear un array de objetos con emojis según la categoría
  const cardImages = allCardValues.map((value) => {
    let emoji
    switch (gameState.cardCategory) {
      case "animals":
        emoji = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔"][
          value % 16
        ]
        break
      case "tech":
        emoji = ["📱", "💻", "⌨️", "🖥️", "🖨️", "🖱️", "💽", "💾", "💿", "📀", "🎮", "🎧", "📷", "📹", "🔋", "🔌"][value % 16]
        break
      default: // emojis
        emoji = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰"][
          value % 16
        ]
    }

    return {
      id: value,
      emoji: emoji,
    }
  })

  // Crear las cartas
  createCards(cardImages)
}

