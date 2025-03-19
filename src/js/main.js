// Archivo principal que importa y coordina todos los módulos
import { setupUIToggle } from "./modules/uiToggle.js"
import { setupNavigation } from "./modules/navigation.js"
import { setupGameModes } from "./modules/gameModes.js"
import { setupCardCategories } from "./modules/cardCategories.js"
import { setupGameStart } from "./modules/gameStart.js"
import { setupRadioContainers } from "./modules/utils.js"
import { updateConfigDisplay } from "./modules/configDisplay.js"
import { gameState } from "./modules/gameState.js"

// Inicializar todo cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
    // Inicializar el estado del juego
    gameState.init()

    // Configurar todos los módulos
    setupUIToggle()
    setupNavigation()
    setupGameModes()
    setupCardCategories()
    setupGameStart()
    setupRadioContainers()

    // Mostrar la configuración inicial
    updateConfigDisplay()
})

