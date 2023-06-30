window.onload = function () {
  fetch("/api/products")
    .then((response) => response.json())
    .then((data) => procesarDatos(data.payload))
    .catch((error) => console.error(error));

  const productos = document.getElementById("productos");
  const cartel = document.getElementById("cartel");

  function agregarAlCarrito(data) {
    fetch(`/api/carts/products/${data}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Producto agregado al carrito:", result);
      })
      .catch((error) => console.error(error));
  }

  function procesarDatos(data) {
    console.log(data);
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
              <button class="btn btn-dark add-to-cart-btn" data-product-id="${product._id}">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      `;
    });

    productos.innerHTML = html;

    // Capturar el evento de clic del botón "Add to cart"
    const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");
    for (let i = 0; i < addToCartBtns.length; i++) {
      addToCartBtns[i].addEventListener("click", function (event) {
        event.preventDefault();
        const productId = this.getAttribute("data-product-id");
        agregarAlCarrito(productId);
      });
    }
  }
};
