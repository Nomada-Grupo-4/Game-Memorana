
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

