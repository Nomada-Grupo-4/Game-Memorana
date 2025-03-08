const tematicas = {
    prueba: [ "/imágenes/img1.webp",
              "/imágenes/img2.webp",
              "/imágenes/img3.webp",
              "/imágenes/img4.webp"
              ]
  }
  
  //obtenemos el contenedor 
  const contenedor = document.getElementById("contain");
  
  //Arreglo de valores para iniciar el juego
  let valoresDeJuego = ["prueba", 3];
  
  //Arreglo para guardar en string la dirección de las imágenes a usar
  let img = [];
  
  //Función para extraer x elementos definidos por el usuario 
  function itemsDeContenedor(...valoresDeJuego){
    for (let i = 0; i<valoresDeJuego[1] ; i++){
      img.push(tematicas[valoresDeJuego[0]][i]);
    }
  }
  
  //apicamos la función para almacenar las direcciones en img
  itemsDeContenedor(...valoresDeJuego)
  
  //usamos map para crear las lineas de cada contenido a mostrar en contain
  const contenedorDeEtiquetas= img.map((elemt,index) => `<img src="${elemt}" class="card voltear-carta" data-value="${index}" onclick="cartaElegida(this)" alt="${valoresDeJuego[0]}">`);
  
  //usamos flatmap para duplicar y obtener un arreglo nuevo con los valores duplicados.
  const etiquetasDuplicadas = contenedorDeEtiquetas.flatMap((elemto) => [elemto, elemto]);
  
  //usamos .join("") para unir el contenido en un solo string
  const elementosPreparados = etiquetasDuplicadas.join("");
  
  //mostramos los items
  contenedor.innerHTML = elementosPreparados;
  
  //**************//
  //contenedor de primera carta.
  let cartasElegidas = [];
  //funcion de onclick
  function cartaElegida(elemento){
    //verificamos si contenedor posee la primera carta
    if (cartasElegidas.length == 0){
      //agregamos primera carta
      cartasElegidas.push(elemento);
    }else{
      //comparamos la primera carta con la segunda usando su data-value
      if(elemento.dataset.value == cartasElegidas[0].dataset.value){
        //si es correcta usamos alteramos su stilo o borramos su interaccion
        cartasElegidas[0].remove();
        elemento.remove();
        //reiniciamos el contenedor a 0
        cartasElegidas = [];
      }else{
        //reiniciamos el contenedor a 0
        cartasElegidas = [];
      }
    }
  }