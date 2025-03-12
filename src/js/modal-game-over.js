//Temporizador
let tiempoRestante = 6;
const tiempo = document.getElementById("tiempo");
const modalGameOver = document.getElementById("modaL-GameOver");

let contador = null;

function correrTiempo () {
    contador = setInterval(()=> {
        if(tiempoRestante > 1){
            tiempoRestante--;
            tiempo.innerText = `${tiempoRestante}`
        } else {
            clearInterval(contador);
//Mostramos modal de GameOver
        modalGameOver.classList.remove("hidden")
        modalGameOver.classList.add("grid", "fixed", "z-[40]");
        }
    },1000);
}
correrTiempo();
let tiempoGuardado = null;
let play = true
function playPause(valor){
    if(play){
        play = false;
        tiempoGuardado = tiempoRestante;
        clearInterval(contador);
        valor.style.background = "gray"
    }else{
        play = true;
        correrTiempo();
        valor.style.background = ""
    }
}

//funcion para mostrar model cerrar juego
function salirDeJuego(){
    const modalSalir = document.getElementById("modalSalir");
    modalSalir.classList.remove("hidden")
    modalSalir.classList.add("grid", "fixed", "z-[40]");
}

function regresarJuego(){
    const modalSalir = document.getElementById("modalSalir");
    modalSalir.classList.remove("grid", "fixed", "z-[40]")
    modalSalir.classList.add("hidden");  
}