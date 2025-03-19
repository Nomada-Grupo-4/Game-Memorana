// Módulo para manejar la navegación entre secciones
import { updatePlayer2Field } from "./gameModes.js"

export function setupNavigation() {
    const registerBtn = document.getElementById("registerBtn")
    const configBtn = document.getElementById("configBtn")
    const registerSection = document.getElementById("registerSection")
    const configSection = document.getElementById("configSection")

    registerBtn.addEventListener("click", () => {
        // Mostrar sección de registro
        registerSection.classList.remove("hidden")
        configSection.classList.add("hidden")

        // Actualizar estilos de los botones
        registerBtn.classList.add("bg-white")
        configBtn.classList.remove("bg-white")

        // Verificar si necesitamos mostrar el campo del segundo jugador
        updatePlayer2Field()
    })

    configBtn.addEventListener("click", () => {
        // Mostrar sección de configuración
        registerSection.classList.add("hidden")
        configSection.classList.remove("hidden")

        // Actualizar estilos de los botones
        registerBtn.classList.remove("bg-white")
        configBtn.classList.add("bg-white")
    })
}

