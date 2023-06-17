const form = document.getElementById("loginForm");
const productsLink = document.getElementById("productsLink")

/**
Este código agrega un event listener a un formulario HTML para que, cuando se envíe, se realice una petición POST 
a una URL específica utilizando la función fetch().

Primero, el evento submit se previene con e.preventDefault(). Luego, se crea un objeto vacío obj y se llena con los 
valores del formulario usando forEach() y el objeto FormData. Luego se define la URL de la petición, los encabezados 
y el método HTTP como constantes. El cuerpo de la petición se convierte en una cadena JSON utilizando JSON.stringify().

Luego, se llama a la función fetch() con la URL, los encabezados, el método y el cuerpo de la petición. La respuesta 
se convierte en formato JSON con response.json(), y luego se hace una llamada a console.log() para imprimir el objeto 
JSON devuelto por la API.

Finalmente, se llama al método .click() del enlace "productsLink" después de un breve retraso de 1 segundo, que 
redirigirá al usuario a otra página. */
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => obj[key] = value);

    const url = "/api/auth";
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