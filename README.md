# 🃏 Game Memorama 

**Memorama** (also known as **Concentration** or **Memory**) is a classic card-matching game that tests players' memory and concentration skills. The goal is to match pairs of identical cards by flipping them over. The game ends when all pairs have been found.

## 🎯 Game Flowchart

This diagram illustrates the game's state transitions and logic.


---
```markdown
# Juego "Memorama" con Temática Personalizable

## 📍 Flujo del Juego

- **Inicio**
  - Mostrar menú principal
    - Seleccionar modo de juego:
      - 1 Jugador
      - 2 Jugadores
      - Contra la PC
  - Seleccionar temática del juego
  - Cargar imágenes según la temática seleccionada
  - Iniciar cronómetro individual para cada jugador
  - Mostrar tablero de cartas
  - Mientras queden cartas por emparejar:
    - Esperar selección de 2 cartas
    - Verificar si son iguales
      - ✅ Sí → Mantener descubiertas y sumar puntos
      - ❌ No → Ocultar cartas nuevamente
    - Cambiar de turno si es multijugador
  - Detener cronómetro cuando se completen todas las parejas
  - Comparar tiempos (si hay más de un jugador)
    - Determinar al ganador (menor tiempo)
  - Mostrar ranking
    - Guardar tiempo en la tabla de récords
    - Mostrar mejores tiempos registrados
  - **Opciones finales:**
    - 🔄 Jugar de nuevo → Reiniciar juego
    - 🚪 Salir → Volver al menú principal
- **Fin**



## 📂 Project Structure

```
└── 📁 Game-memorama
└── 📁 public └── 📁 audio # Game sound effects and background music
└── 📁 img # Card images and other assets
└── 📁 src └── 📁 css └── main.css # Styles for the game interface
└── 📁 js └── main.js # Core game logic and interactivity
└── index.html # Main entry point of the game
└── LICENSE # Project license
└── README.md # Project documentation and instructions

```

This structure ensures a clean separation of assets, styles, and scripts, making the game easy to maintain and expand. 🚀

