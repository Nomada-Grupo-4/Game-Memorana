export function saveData(key, value) {
    let data = JSON.parse(localStorage.getItem("appData")) || {};

    if (key === "players") {
        data.players = data.players || []; // Si no hay jugadores, creamos el array
        data.players.push(value); // Agregamos el nuevo jugador
    } else {
        data[key] = value; // Para otros datos, lo guardamos normalmente
    }

    localStorage.setItem("appData", JSON.stringify(data));
}
