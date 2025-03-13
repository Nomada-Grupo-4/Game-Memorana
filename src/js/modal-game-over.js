//Temporizador
let tiempoRestante = 5;

//arreglo EJEMPLO para exponer modal GameOver
const resultados = {
    points: 350,
    time: 2,
    acerts: 10,
    totalAcerts: 12
}

const tiempo = document.getElementById("tiempo");
const modalGameOver = document.getElementById("modaL-GameOver");

//funcion para cargados de resumen de juego a modal GameOver
function cargarDatosGO (){
    
    //obtenemos los id para modificar
    const totalPuntos = document.getElementById("total-puntos");
    const puntos = document.getElementById("points");
    const tiempo = document.getElementById("time");
    const aciertos = document.getElementById("acerts")
    //destructuramos el objeto resutados
    const {points, time, acerts, totalAcerts} = resultados;
    //agregamos nuevos valores
    totalPuntos.innerHTML = `${points*(acerts*time)}`;
    puntos.innerHTML = `${points}`;
    tiempo.innerHTML = `${time}`;
    aciertos.innerHTML = `${acerts}/${totalAcerts}`;
}
//funcion para mostrar u ocultar modal
function mostrarQuitarModal (modal){
    modal.classList.toggle("hidden");
}
let contador = null;
//funcion para corre temporizador e inicar juego
function correrTiempo () {
    contador = setInterval(()=> {
        if(tiempoRestante > 1){
            tiempoRestante--;
            tiempo.innerText = `${tiempoRestante}`
        } else {
            clearInterval(contador);
        //Cargamos datos y mostramos modal GameOver
            cargarDatosGO();
            mostrarQuitarModal(modalGameOver);
            console.log(`mostrar modal`);
        //codigo para mostrar estadisticas
        /*
        setTimeout(()=>{
            mostrarQuitarModal(modalGameOver);
            mostrarQuitarModal(modalEstadisticas);
        },4000)*/
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
    modalSalir.classList.toggle("hidden")
    clearInterval(contador)
}

function regresarJuego(){
    const modalSalir = document.getElementById("modalSalir");
    modalSalir.classList.toggle("hidden");
    correrTiempo();
}