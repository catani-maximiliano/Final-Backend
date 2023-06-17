const form = document.getElementById("form");
const loginLink = document.getElementById("loginLink")

/**Este fragmento de código agrega un "event listener" al formulario (representado por la variable "form") que espera el 
 * evento "submit" para ejecutar una función. En esta función se previene el comportamiento por defecto del formulario al 
 * utilizar el método "preventDefault()".

Luego se crea un objeto "FormData" con los datos del formulario y se los transforma en un objeto JSON. Este objeto JSON se 
utiliza como cuerpo del pedido HTTP que se realiza al servidor a través de la función "fetch()".

Los parámetros que se pasan a la función fetch() incluyen la URL de la API, los encabezados HTTP que indican el tipo de 
contenido que se está enviando y el método HTTP utilizado, que en este caso es "POST".

Finalmente, se procesa la respuesta del servidor y se redirecciona al usuario a través del método "click()" en el enlace 
de login después de un retraso de un segundo. */
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form)
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    const url = "/user";
    const headers = { "Content-Type": "application/json"};
    const method = "POST";
    const body = JSON.stringify(obj);

    fetch(url, {
        headers,
        method,
        body
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
    setTimeout(()=>{loginLink.click()}, 1000);
})