
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

//Obtención del Ready y el modal
const readyBtn = document.getElementById("ready");
const modalRegister = document.getElementById("modal-register");

//Muestra el modal con los datos almacenados
if (readyBtn) {
    readyBtn.addEventListener("click", function () {
        modalRegister.classList.remove("hidden");
        modalRegister.style.display = "flex";
    });
}


let selectedAvatar = null;

function selectImage(img) {
    
    //No estan seleccionadas las imágenes
    document.querySelectorAll ('.image').forEach(element =>{element.classList.remove('border-yellow-500');
    });

    img.classList.add('border-yellow-500');

    //Se guarda la imagen que seleccionó
    selectedAvatar = img.src;
}

function registerPlayer(){
    const playerName = document.getElementById("player-name").value.trim();
    
    //Validación de nombre
    if (!playerName){
        alert("Por favor, ingresa tu nombre.");
        return;
    }

    //Validación de avatar
    if (!selectedAvatar) {
        alert("Por favor, selecciona un avatar.");
        return;
    }

    //Guarda información en el localStorage para usarlos en la página2
    localStorage.setItem("playerName",playerName);
    localStorage.setItem("selectedAvatar",selectedAvatar);

    //Redirige a la página 2
    window.location.href = "game.html";

}

const registerBtn = document.getElementById("register-btn");
if (registerBtn) {
    registerBtn.addEventListener("click", registerPlayer);
}


//game.html

// Te permite ejecutar la página con el nombre y el avatar seleccionado
document.addEventListener("DOMContentLoaded",function(){
    const playerName =localStorage.getItem("playerName");
    const selectedAvatar = localStorage.getItem("selectedAvatar");

if (playerName && selectedAvatar) {
    document.getElementById("playerName").textContent = playerName;
    document.getElementById("player-avatar").src = selectedAvatar;
} else {
    alert("No hay datos guardados. Redirigiendo...");
    window.location.href = "index.html";
}

});
