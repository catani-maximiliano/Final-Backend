const url = window.location.href; // obtener la URL actual
const parts = url.split('/'); // separar la URL por "/"
const id = parts[parts.length - 1]; // obtener la última parte de la URL, que es el ID del producto

/**Este es un evento que se dispara cuando la página ha terminado de cargar. Lo que hace es llamar a la función fetch, 
 * que realiza una petición HTTP GET a la URL especificada y devuelve una promesa que se resuelve con la respuesta. 
 * Luego, encadenamos un .then que convierte la respuesta en formato JSON y extrae los datos necesarios con la función 
 * procesarDatos. Si hay algún error, lo capturamos con un .catch y lo mostramos en la consola del navegador. */
window.onload = function() {
  fetch(`http://localhost:3000/api/carts/${id}`)
    .then(response => response.json())
    .then(data => procesarDatos(data.payload))
    .catch(error => console.error(error));
};

const cart = document.getElementById("cart");
const cartel = document.getElementById("cartel");


/**El código muestra una función llamada "procesarDatos", que se utiliza para procesar los datos recibidos de 
 * una solicitud fetch a una API. La función toma los datos recibidos y crea una cadena de texto HTML que se utiliza 
 * para representar los productos del carrito. Luego, la cadena HTML se inserta en el documento HTML utilizando la 
 * propiedad "innerHTML" de un elemento HTML.

En resumen, la función "procesarDatos" se utiliza para actualizar la página web con la información de los productos del 
carrito recibidos desde la API. */
function procesarDatos(data) {
  let html = data.products.map( (data) => {
    let respon =  
    `<div class="product-info container">
      <h2>${data.product.title}</h2>
      <p>price: ${data.product.price}</p>
      <p>id: ${data.product._id}</p>
      <p>quantity: ${data.quantity}</p>
    </div>`;
    return respon;

  })
  cart.innerHTML = html.join('');   
  cartel.innerHTML =
  `<div class="container">
    <button class="btn btn-dark">
      <a class="text-decoration-none text-light" href='/products'>
        Go to Products
      </a>
    </button>
    <button class="btn btn-dark">
      <a class="text-decoration-none text-light" href='/carts'>
        Go to Carts
      </a>
    </button>
  </div>`;
}

