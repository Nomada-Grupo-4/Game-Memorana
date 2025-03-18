import { saveData } from "./storage.js";

// Inyectar manualmente el CSS si Webpack no lo maneja
if (!document.querySelector(`link[href="src/css/modal.css"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "src/css/modal.css";
    document.head.appendChild(link);
}

export function loadModal() {
    let modal = document.getElementById("modal-register");

    // Si el modal no existe, créalo
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "modal-register";
        modal.className = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden";

        modal.innerHTML = `
            <div class="max-w-md p-6 bg-white shadow-lg rounded-lg shadow-green-200/50">
                <h1 class="text-3xl text-center font-bold mb-6">Memorama</h1>
                <div class="mb-4">
                    <label for="player-name" class="font-medium block">Nombre:</label>
                    <input type="text" id="player-name" class="border p-2 w-full rounded bg-gray-100" required>
                </div>
                <div class="mb-4">
                    <label class="font-medium block">Avatar:</label>
                    <div class="grid grid-cols-4 gap-4 p-2 bg-white shadow-lg rounded-lg">
                        <img src="public/img/animal1.jpg" class="image">
                        <img src="public/img/smile.jpg" class="image">
                        <img src="public/img/animal4.jpg" class="image">
                        <img src="public/img/robot1.jpg" class="image">
                    </div>
                </div>
                <button id="register-btn" class="w-full bg-lime-400 text-black font-semibold py-2 rounded hover:bg-lime-500">
                    Registrar
                </button>
            </div>
        `;

        document.body.appendChild(modal);
        initModalLogic(modal);
    }

    // Mostrar el modal cuando se active
    console.log("Mostrando modal...");
    modal.classList.add("active");

}

function initModalLogic(modal) {
    const registerBtn = modal.querySelector("#register-btn");
    let selectedAvatar = null;

    modal.querySelectorAll(".image").forEach(img => {
        img.addEventListener("click", () => {
            modal.querySelectorAll(".image").forEach(el => el.classList.remove("border-yellow-500"));
            img.classList.add("border-yellow-500");
            selectedAvatar = img.src;
        });
    });

    if (registerBtn) {
        registerBtn.addEventListener("click", () => {
            const playerName = document.getElementById("player-name").value.trim();
            if (!playerName) return alert("Por favor, ingresa tu nombre.");
            if (!selectedAvatar) return alert("Por favor, selecciona un avatar.");

            saveData("player", { name: playerName, avatar: selectedAvatar });
            window.location.href = "game.html";
        });
    }
}
