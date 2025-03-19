// Módulo para funciones de utilidad

export function setupRadioContainers() {
    // Hacer que los contenedores completos sean clicables para los radio buttons
    document.querySelectorAll(".relative label").forEach((label) => {
        label.addEventListener("click", function () {
            const input = document.getElementById(this.getAttribute("for"))
            if (input) {
                input.checked = true
                input.dispatchEvent(new Event("change"))
            }
        })
    })
}

