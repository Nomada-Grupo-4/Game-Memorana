
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

//Muestra el modal
readyBtn.addEventListener("click", function (){
    modalRegister.classList.remove("hidden");
    modalRegister.style.display = "flex";
})
