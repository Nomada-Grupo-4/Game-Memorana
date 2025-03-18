document.addEventListener("DOMContentLoaded", function () {
    // Recupera los datos de 'appData' desde localStorage
    const appData = JSON.parse(localStorage.getItem("appData")) || {};

    // Accede directamente al objeto 'player'
    const player = appData.player || {};  // Accede a 'player' directamente

    console.log(player);  // Verifica en la consola el objeto 'player'

    // Verifica si los datos del jugador están disponibles
    if (player.name && player.avatar) {
        document.getElementById("playerName").textContent = player.name;  // Actualiza el nombre del jugador
        document.getElementById("player-avatar").src = player.avatar;      // Actualiza el avatar del jugador
    } else {
        console.log("No player data found");  // Si no se encuentra el jugador, muestra el mensaje en consola
    }
});
