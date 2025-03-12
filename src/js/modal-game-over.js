//Temporizador
let tiempoRestante = 5;
const tiempo = document.getElementById("tiempo");
const modalGameOver = document.getElementById("modaL-GameOver");

let contador = null;

function correrTiempo () {
    contador = setInterval(()=> {
        if(tiempoRestante > 0){
            tiempoRestante--;
            tiempo.innerText = `${tiempoRestante}`
        } else {
            clearInterval(contador);
           
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