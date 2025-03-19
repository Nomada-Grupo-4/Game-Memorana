// Módulo para manejar las categorías de cartas
import { gameState } from "./gameState.js"
import { updateConfigDisplay } from "./configDisplay.js"

export function setupCardCategories() {
  const emojis = document.getElementById("emojis")
  const animals = document.getElementById("animals")
  const tech = document.getElementById("tech")

  emojis.addEventListener("change", function () {
    if (this.checked) {
      gameState.setCardCategory("emojis")
      updateConfigDisplay()
    }
  })

  animals.addEventListener("change", function () {
    if (this.checked) {
      gameState.setCardCategory("animals")
      updateConfigDisplay()
    }
  })

  tech.addEventListener("change", function () {
    if (this.checked) {
      gameState.setCardCategory("tech")
      updateConfigDisplay()
    }
  })
}

