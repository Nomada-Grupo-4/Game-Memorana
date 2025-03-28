import './style.css'


  function openModal() {
    const modal = document.getElementById('myModal');
  
    if (modal) {

    //recuperacion el ranking del local storage
      const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    
    //ordenamos el ranking de mayor a menor puntuacion
      ranking.sort((a, b) => b.score - a.score);

    //tomar los 5 mejores resultados
    const top5 = ranking.slice(0, 5);

    //generamos el contenido dinamico del ranking

    const rankingList = document.getElementById('ranking-list');

    if (rankingList) {
      rankingList.innerHTML = ""; // Limpiar contenido previo
      top5.forEach((player, index) => {
      // determinamos la imgen a mostrar a las 3 primeras posiciones
        let positionContent;
        if (index === 0) {
          positionContent = `<img src="/img/1erPuesto.png" alt="Primer puesto" class="h-14 w-14">`;
        } else if (index === 1) {
          positionContent = `<img src="/img/2doPuesto.png" alt="Segundo puesto" class="h-11 w-11">`;
        } else if (index === 2) {
          positionContent = `<img src="/img/3erPuesto.jpg" alt="Tercer puesto" class="h-9 w-9">`;
        } else {
          positionContent = `${index + 1}`; // Mostrar el índice para las demás posiciones
        }

      //agregamos el contenido al ranking
        rankingList.innerHTML += `
          <div class="grid grid-cols-3 gap-4 text-center border-gray-300 p-2">
            <div class="flex items-center justify-center">${positionContent}</div>
            <div class="flex items-center justify-center">${player.name}</div>
            <div class="flex items-center justify-center">${player.points} pts (${player.time}s)</div>
          </div>
        `;
      });
    }

      // Mostrar el modal

      modal.classList.remove('hidden');
      modal.classList.add('flex', 'items-center', 'justify-center');
    } else {
      console.error('Modal element not found');
    }
  }
  
  function closeModal() {
    const modal = document.getElementById('myModal');
  
    if (modal) {
      modal.classList.remove('flex', 'items-center', 'justify-center');
      modal.classList.add('hidden');
    } else {
      console.error('Modal element not found');
    }
  }

  // agregamos la funcionalidad del boton return to home
  function menu() {
    window.location.href = "/menu.html";
  }

  // Mostrar el modal automáticamente después de 5 segundos (5000 ms)
  setTimeout(() => {
    openModal();
  }, 3000);

  //expocision de las funciones al ambito global
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.menu = menu;