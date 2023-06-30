window.onload = function () {
  fetch(`https://final-backend-production-f554.up.railway.app//api/sessions/current`)
    .then((response) => response.json())
    .then((user) => findCart(user.payload.idd))
    .catch((error) => console.error(error));

  function findCart(uid) {
    fetch(`https://final-backend-production-f554.up.railway.app//api/carts/${uid}`)
      .then((response) => response.json())
      .then((data) => procesarDatos(data.payload))
      .catch((error) => console.error(error));
  }
};

const carts = document.getElementById("carts");

function procesarDatos(data) {
  if (!data || !Array.isArray(data.products)||data.products.length === 1) {
    carts.innerHTML = "<p>No hay productos en el carrito</p>";
    return;
  }

  let html = data.products.map((product) => {
    return `<li>${product.title}</li>`;
  }).join("");

  carts.innerHTML = `<div class="product-info container">
                        <h3>Carrito con Id ${data._id}</h3>
                        <ul>${html}</ul>
                        <div class="container">
                          <button class="btn btn-dark">
                            <a class="text-decoration-none text-light" href='/cart/${data._id}'>Product details</a>
                          </button>
                        </div>
                    </div>`;
}
