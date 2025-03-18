import { loadModal } from "../js/modal.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("main.js cargado correctamente"); // Verificar si `main.js` se ejecuta

    const readyBtn = document.getElementById("ready");

    if (readyBtn) {
        console.log("Botón Ready encontrado."); // Verificar si `#ready` existe
        readyBtn.addEventListener("click", () => {
            console.log("Botón Ready presionado, cargando modal...");
            loadModal();
        });
    } else {
        console.warn("El botón 'Ready' no se encontró en el DOM.");
    }
});


// Mostrar header y footer solo en pantallas menores a 800px
function toggleHeaderFooter() {
    if (window.innerWidth < 800) {
        document.querySelector("header").classList.remove("hidden");
        document.querySelector("footer").classList.remove("hidden");
    } else {
        document.querySelector("header").classList.add("hidden");
        document.querySelector("footer").classList.add("hidden");
    }
}

window.addEventListener("resize", toggleHeaderFooter);
window.addEventListener("load", toggleHeaderFooter);
