window.onload = function () {
  fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => procesarDatos(data.payload))
    .catch((error) => console.error(error));
};

const productos = document.getElementById("productos");
const cartel = document.getElementById("cartel");

function procesarDatos(data) {
  function agregarAlCarrito (data) {
    const product = data.product
  }

  const linkMold = data.linkMold;
  cartel.innerHTML = `
    <h1>¡Bienvenido/a ${data.user.first_name} ${data.user.last_name}!</h1>
    <h3>Eres: ${data.user.role}</h3>
  `;

  let html = "";

  data.payload.forEach((product) => {
    html += `
      <div class="col-md-4">
        <div class="product-info">
          <h2>${product.title}</h2>
          <p>description: ${product.description}</p>
          <p>price: ${product.price}</p>
          <img src="${product.thumbnail[0]}" alt="img" class="img-fluid">
          <div class="container">
            <button class="btn btn-dark">
              <a class="text-decoration-none text-light" href="/products/${product._id}">Product details</a>
            </button>
            <button onclick="agregarAlCarrito("${product._id}") class="btn btn-dark">
              <a href="">Add to cart</a>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  productos.innerHTML = html;
}
