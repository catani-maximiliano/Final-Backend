const form = document.getElementById("loginForm");
const respuesta = document.getElementById("respuesta");
const productsLink = document.getElementById("productsLink")

/**
El código que has proporcionado es similar al anterior, pero en lugar de hacer una solicitud a la ruta "/api/auth/passwordReset", realiza una solicitud a la ruta "/api/auth/passwordUpdate". Aquí está la explicación paso a paso de lo que ocurre en el código:

1.Se agrega un evento de escucha al formulario que captura el evento de envío ("submit").
2.Se utiliza e.preventDefault() para evitar que el formulario se envíe de forma predeterminada y se recargue la página.
3.Se crea un objeto FormData a partir del formulario para obtener los datos enviados.
4.Se crea un objeto vacío obj que se utilizará para almacenar los datos del formulario.
5.Se recorren los pares clave-valor de los datos del formulario utilizando data.forEach y se asignan al objeto obj.
6.Se define la URL a la que se realizará la solicitud POST ("/api/auth/passwordUpdate").
7.Se especifican las cabeceras de la solicitud, en este caso, el tipo de contenido es "application/json".
8.Se especifica el método de la solicitud, en este caso, "POST".
Se convierte el objeto obj a una cadena JSON utilizando JSON.stringify() y se asigna como cuerpo de la solicitud.
Se realiza la solicitud fetch a la URL especificada, pasando las cabeceras, el método y el cuerpo.
Se manejan las respuestas de la solicitud utilizando las funciones then. En este caso, se pasa la respuesta a la función procesarDatos(data).
Si ocurre algún error durante la solicitud, se captura y se muestra en la consola con console.log(err).
Se utiliza setTimeout para esperar 2 segundos (2000 milisegundos) antes de hacer clic en un enlace con el id "productsLink".
El código dentro de setTimeout no está comentado, por lo que ejecutaría productsLink.click(), lo que podría desencadenar un evento de clic en un enlace con el id "productsLink". */
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => obj[key] = value);

    const url = "/api/auth/passwordUpdate";
    const headers = {
        "Content-Type": "application/json"
    }
    const method = "POST";
    const body = JSON.stringify(obj);

    fetch(url, {
        headers,
        method,
        body
    })
    .then(response => response.json())
    .then(data => procesarDatos(data))
    //.then(productsLink.click())
    .catch(err => console.log(err))
    setTimeout(()=>{productsLink.click()}, 2000); 
})

function procesarDatos(data) {
    console.log(data)
    respuesta.innerHTML =   
    `<h1>Mensaje: ${data.mesagge}</h1>`;
 
}