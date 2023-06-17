
/**Este fragmento de código es un evento que se dispara cuando la ventana del navegador ha terminado de cargar. 
 * En este caso, se hace una solicitud HTTP GET al servidor en la ruta "http://localhost:3000/api/realTimeProducts" 
 * para obtener información de productos en tiempo real. Luego, se convierte la respuesta a un objeto JSON y se pasa 
 * como argumento a la función "procesarDatos". Si ocurre algún error durante la solicitud, se mostrará en la consola 
 * del navegador. */
window.onload = function() {
  fetch('http://localhost:3000/api/realTimeProducts')
    .then(response => response.json())
    .then(data => procesarDatos(data.payload))
    .catch(error => console.error(error));
};

const productos = document.getElementById("notliveProducts");

/**se encarga de procesar y mostrar en el HTML una lista de productos en tiempo real obtenidos mediante una petición GET 
 * a la ruta "/api/realTimeProducts" en el servidor. Cuando se recibe la respuesta con los datos de los productos, 
 * se genera un string de HTML que contiene la información de cada uno de ellos, como su título, imagen, descripción, precio,
 *  código, stock, estado, categoría e ID. Luego, se agrega este string al contenido del elemento con ID "productos" del HTML,
 *  el cual se utiliza para mostrar la lista de productos en la página web. */
function procesarDatos(data) {
  let html = data.docs.map( (data) => {
      let respon =  
      `<div class="product-info">
      <h2>${data.title}</h2>
      <img src="${data.thumbnail[0]}" alt="img"  width="200" height="150">
      <p>description: ${data.description}</p>
      <p>price: ${data.price}</p>
      <p>code: ${data.code}</p>
      <p>stock: ${data.stock}</p>
      <p>status: ${data.status}</p>
      <p>category: ${data.category}</p>
      <p>id: ${data._id}</p>
    </div>`;
      return respon;
  
    })
    productos.innerHTML = html.join('');    
}


/**Este código inicializa una conexión WebSocket con el servidor utilizando la biblioteca Socket.IO. 
 * Al llamar a la función io() se establece una conexión con el servidor y se devuelve un objeto Socket que se puede 
 * utilizar para enviar y recibir mensajes. */
const socket = io();

const liveProducts = document.getElementById("liveProducts");

/**Este fragmento de código es un listener de eventos en el cliente para recibir y mostrar en el HTML la lista 
 * de productos en tiempo real. Cuando se recibe el evento "statusProductsList" con un arreglo de objetos de productos 
 * como datos, se genera un string de HTML que contiene cada uno de los productos y se agrega al contenido del elemento 
 * con ID "liveProducts" del HTML. Cada producto se compone de su información como título, imagen, descripción, precio, 
 * código, stock, estado, categoría e ID. Además, antes de mostrar la lista de productos en tiempo real, se limpia el 
 * contenido del elemento con ID "notliveProducts" del HTML. */
socket.on('statusProductsList', (data) => {
  document.getElementById("notliveProducts").innerHTML = "";
  let html = data.docs.map( (data) => {
    let respon =  
    `<div class="product-info">
      <h2>${data.title}</h2>
      <img src="${data.thumbnail[0]}" alt="img"  width="200" height="150">
      <p>description: ${data.description}</p>
      <p>price: ${data.price}</p>
      <p>code: ${data.code}</p>
      <p>stock: ${data.stock}</p>
      <p>status: ${data.status}</p>
      <p>category: ${data.category}</p>
      <p>id: ${data._id}</p>
    </div>`;
    return respon;

  })
  liveProducts.innerHTML = html.join(''); 
});

/**
Este fragmento de código es un listener de eventos en el cliente para recibir y mostrar cualquier error emitido por el servidor 
a través del evento "error */
socket.on('error', (error) => {
  console.error(error);
});