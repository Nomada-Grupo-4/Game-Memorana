// Módulo para manejar la expansión/contracción de secciones
import { gameState } from "./gameState.js"

export function setupUIToggle() {
    const toggleButton = document.getElementById("toggleButton")
    const expandableSection = document.getElementById("expandableSection")
    const chevronIcon = document.getElementById("chevronIcon")

    toggleButton.addEventListener("click", () => {
        const isOpen = gameState.toggleOpen()

        if (isOpen) {
            expandableSection.classList.remove("max-h-0", "opacity-0")
            expandableSection.classList.add("max-h-expandable", "opacity-100")
            chevronIcon.classList.add("rotate-180")
        } else {
            expandableSection.classList.remove("max-h-expandable", "opacity-100")
            expandableSection.classList.add("max-h-0", "opacity-0")
            chevronIcon.classList.remove("rotate-180")
        }
    })
}

