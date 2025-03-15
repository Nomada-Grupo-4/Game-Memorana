
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


document.getElementById("ready").addEventListener("click", function() {
    document.getElementById("modal-register").style.display = "block";
    });
 

//Variable para almacenar el avatar seleccionado
let selectedAvatar =null;

function selectImage(img) {
    // Quitar la selección de todas las imágenes
    document.querySelectorAll('.image').forEach(el => el.classList.remove('border-blue-500'));

    // Agregar borde a la imagen seleccionada
    img.classList.add('border-blue-500');

    // Guardar la imagen seleccionada
    selectedAvatar = img.src; 
}

function openModal() {

    const playerName = document.getElementById("player-name").value;
    if (!playerName) {
        alert("Por favor, ingresa tu nombre.");
        return;
    }if (!selectedAvatar) {
        alert("Por favor, selecciona un avatar.");
        return;
    }

    // Guardar en localStorage para que el otro HTML pueda acceder
    localStorage.setItem("playerName", playerName);
    localStorage.setItem("playerAvatar", selectedAvatar);
}