import './style.css'


  function openModal() {
    const modal = document.getElementById('myModal');
  
    if (modal) {
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

  //exponer las funciones al ambito global
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.menu = menu;