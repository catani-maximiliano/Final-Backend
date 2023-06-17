/**
Este código se ejecuta cuando la página web se ha cargado completamente. Luego, se hace una petición HTTP GET a la 
URL http://localhost:3000/api/carts usando la función fetch() de JavaScript.

Después, se espera a que la respuesta de la petición sea procesada usando el método json() de la respuesta. 
Finalmente, se llama a la función procesarDatos() y se le pasa como argumento la respuesta en formato JSON obtenida 
en la petición. En caso de que haya algún error, se muestra el error en la consola del navegador. */
window.onload = function() {
    fetch('http://localhost:3000/api/carts')
      .then(response => response.json())
      .then(data => procesarDatos(data.payload))
      .catch(error => console.error(error));
  };

const carts = document.getElementById("carts");

/**La función procesarDatos recibe como parámetro un objeto data, y lo procesa para generar una cadena HTML que 
 * representa información de carritos de compra.

Primero, la función utiliza el método map() para iterar sobre un arreglo de objetos data. En cada iteración, se 
genera una cadena HTML que contiene información del carrito, como su ID.

La cadena HTML generada se almacena en la variable respon. Luego, se devuelve esta cadena HTML en cada iteración 
del método map().

Finalmente, la cadena HTML resultante se concatena en un solo string usando el método join() y se establece como 
el contenido del elemento con el id carts del documento HTML. */
function procesarDatos(data) {
    let html = data.map( (data) => {
        let respon =  
        `<div class="product-info container">
          <h3>Carito con Id ${data._id}</h3>
          <div class="container">
          <button class="btn btn-dark"><a class="text-decoration-none text-light" href='/cart/${data._id}'>Product details</a></button>
          </div>
        </div>`;
        return respon;
    
      })
      carts.innerHTML = html.join('');    
}

