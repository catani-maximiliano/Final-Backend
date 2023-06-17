const form = document.getElementById("loginForm");
const productsLink = document.getElementById("productsLink")

/**
El código que has proporcionado se refiere a un evento de envío de formulario en el que se realiza una solicitud HTTP POST
 a la ruta "/api/auth/passwordReset" para restablecer la contraseña. Aquí tienes una explicación paso a paso de lo que 
 sucede en el código:

Se agrega un evento de escucha al formulario que captura el evento de envío ("submit").
Se utiliza e.preventDefault() para evitar que el formulario se envíe de forma predeterminada y se recargue la página.
Se crea un objeto FormData a partir del formulario para obtener los datos enviados.
Se crea un objeto vacío obj que se utilizará para almacenar los datos del formulario.
Se recorren los pares clave-valor de los datos del formulario utilizando data.forEach y se asignan al objeto obj.
Se define la URL a la que se realizará la solicitud POST ("/api/auth/passwordReset").
Se especifican las cabeceras de la solicitud, en este caso, el tipo de contenido es "application/json".
Se especifica el método de la solicitud, en este caso, "POST".
Se convierte el objeto obj a una cadena JSON utilizando JSON.stringify() y se asigna como cuerpo de la solicitud.
Se realiza la solicitud fetch a la URL especificada, pasando las cabeceras, el método y el cuerpo.
Se manejan las respuestas de la solicitud utilizando las funciones then. En este caso, se muestra la respuesta en la 
consola con console.log(data).
Si ocurre algún error durante la solicitud, se captura y se muestra en la consola con console.log(err).
Se utiliza setTimeout para esperar 1 segundo (1000 milisegundos) antes de hacer clic en un enlace con el id "productsLink".
El código dentro de setTimeout no está comentado, por lo que ejecutaría productsLink.click(), lo que podría desencadenar 
un evento de clic en un enlace con el id "productsLink". */
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => obj[key] = value);
    //console.log(data)
    const url = "/api/auth/passwordReset";
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
    .then(data => console.log(data))
    //.then(productsLink.click())
    .catch(err => console.log(err))
    setTimeout(()=>{productsLink.click()}, 1000); 
})