/**
Esta función se ejecutará cuando la página se cargue completamente. Realiza una solicitud GET a la API de 
productos en la ruta 'http://localhost:3000/api/products'. Cuando se recibe una respuesta exitosa, la respuesta se 
convierte a formato JSON y se procesa mediante la función procesarDatos, que se espera que haya sido definida en otro lugar. 
Si se produce un error al realizar la solicitud, se registra un mensaje de error en la consola del navegador. */
window.onload = function () {
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => procesarDatos(data.payload))
    .catch((error) => console.error(error));
};

const productos = document.getElementById("productos");
const cartel = document.getElementById("cartel");

/**La función procesarDatos toma como argumento el objeto data que contiene la información de los productos obtenida de la API.
 *  La función comienza creando una variable linkMold que no se utiliza más adelante. Luego, modifica el contenido del elemento 
 * HTML con el id cartel para mostrar un mensaje de bienvenida personalizado con el nombre y apellido del usuario y su rol.

Después, utiliza el método map para iterar sobre el arreglo de productos en data.payload y para cada elemento, crea una cadena
 de texto que contiene información del producto, como título, descripción, precio e imagen, y también botones para ver detalles
  del producto o agregarlo al carrito. La cadena de texto creada se almacena en la variable respon. Finalmente, la función 
  utiliza el método join para unir todas las cadenas de texto creadas por el método map y las agrega como contenido del 
  elemento HTML con el id productos. */
function procesarDatos(data) {
  const linkMold = data.linkMold;
  cartel.innerHTML = `<h1>¡Bienvenido/a ${data.user.first_name} ${data.user.last_name}!</h1>
                       <h3>Eres: ${data.user.role}</h3>`;

  let html = data.payload.map((data) => {
    let respon = `<div class="product-info container">
                    <h2>
                      ${data.title}
                    </h2>
                    <p>
                      description: ${data.description}
                    </p>
                    <p>
                      price: ${data.price}
                    </p>
                    <img src="${data.thumbnail[0]}" alt="img"  width="200" height="150">
                    <div class="container">
                      <button class="btn btn-dark">
                        <a class="text-decoration-none text-light" href='/products/${data._id}'>
                          Product details
                        </a>
                      </button>
                      <button class="btn btn-dark">
                        Add to card
                      </button>
                    </div>
                  </div>`;
    return respon;
  });
  productos.innerHTML = html.join("");
}
