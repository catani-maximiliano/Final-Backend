window.onload = function () {
  
  fetch(`http://localhost:3000/api/carts/mycart`) 
    .then((response) => response.json())
    .then((data) => {console.log(data)
     
      procesarDatos(data.payload);
    })
    .catch((error) => console.error(error));
};


const myCartLink = document.getElementById("mycartlink");
const cart = document.getElementById("cart");
const cartel = document.getElementById("cartel");

function procesarDatos(data) {
  let totalSum = 0; // Variable para almacenar la suma total de precios

  let htmlPromises = data.products.map((product) => {
    console.log(product);
    return fetch(`http://localhost:3000/api/products/${product.product}`)
      .then((response) => response.json())
      .then((productData) => {
        console.log(productData);
        const title = productData.payload.title || "N/A";
        const price = productData.payload.price || "N/A";
        const formattedPrice = formatCurrency(price);
        const id = productData.payload._id || "N/A";
        const img = productData.payload.thumbnail[0] || "N/A";
        const quantity = product.quantity;
        const subtotal = (price * quantity).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });

        // Sumar el subtotal al total
        totalSum += price * quantity;

        return `
          <div class="col-md-4">
            <div class="product-info">
              <h1>${title}</h1>
              <img src="${img}" alt="img" class="img-fluid col-md-4">
              <h2>Price: ${formattedPrice}</h2>
              <p>Quantity: ${quantity}</p>
              <p>Subtotal: ${subtotal}</p>
              <div class="container">
                <input type="number" class="quantity-input" value="${quantity}">
                <button class="btn btn-primary update-quantity-btn" data-product-id="${id}">
                  Update Quantity
                </button>
                <button class="btn btn-dark">
                <a class="text-decoration-none text-light" href="/products/${id}">Product details</a>
              </button>
              <button class="btn btn-danger delete-product-btn" data-product-id="${id}">
                Delete
              </button>
              </div>
            </div>
          </div>`;
      })
      .catch((error) => console.error(error));
  });

  Promise.all(htmlPromises)
    .then((htmlArray) => {
      cart.innerHTML = htmlArray.join("");
      cartel.innerHTML = `<div class="container my-5">
          <button class="btn btn-dark">
            <a class="text-decoration-none text-light" href='/products'>
              Go to Products
            </a>
          </button>
          <button class="btn btn-danger" id="empty-cart-btn">
            Empty Cart
          </button>
          <button class="btn btn-danger" id="purchase-button">
          <a >comprar carro</a>
        </button>
        </div>`;

      // Botón para vaciar el carrito
      const emptyCartButton = document.getElementById("empty-cart-btn");
      emptyCartButton.addEventListener("click", () => {
        fetch("http://localhost:3000/api/carts/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .catch((error) => console.error(error));
        setTimeout(() => {
          myCartLink.click();
        }, 1000);
      });

      // Botón de eliminación de producto
      const deleteProductButtons =
        document.getElementsByClassName("delete-product-btn");
      Array.from(deleteProductButtons).forEach((button) => {
        button.addEventListener("click", (event) => {
          const productId = event.target.dataset.productId;

          fetch(`http://localhost:3000/api/carts/products/${productId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            })
            .catch((error) => console.error(error));
          setTimeout(() => {
            myCartLink.click();
          }, 1000);
        });
      });

      //boton de compra de carrito
      const purchaseButton = document.getElementById("purchase-button");
      purchaseButton.addEventListener("click", () => {
        fetch("http://localhost:3000/api/carts/purchase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
        .then(response => response.json())
        .then(data => {
          console.log(data.payload);
        })
        .catch(error => console.error(error));
        setTimeout(() => {
          emptyCartButton.click();
        }, 1000);
      });

      // Agregar evento de escucha a los botones de actualización de cantidad
      const updateQuantityButtons = document.getElementsByClassName("update-quantity-btn");
      Array.from(updateQuantityButtons).forEach((button) => {
        button.addEventListener("click", (event) => {
          const productId = event.target.dataset.productId;
          const quantityInput = event.target.previousElementSibling;
          const newQuantity = quantityInput.value;

          // Realizar la solicitud PUT/PATCH al endpoint para actualizar la cantidad
          fetch(`http://localhost:3000/api/carts/products/${productId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: newQuantity }),
          })
            .then((response) => response.json())
            .then((data) => {
              // Lógica para manejar la respuesta de la actualización de la cantidad
              console.log(data);
            })
            .catch((error) => console.error(error));
          setTimeout(() => {
            myCartLink.click();
          }, 1000);
        });
      });

      // Mostrar el total de precios de los productos
      const totalFormatted = formatCurrency(totalSum);
      const totalElement = document.createElement("p");
      totalElement.innerHTML = `Total: ${totalFormatted}`;
      cartel.appendChild(totalElement);
    })
    .catch((error) => console.error(error));
}

// Función para formatear el precio en formato de moneda
function formatCurrency(amount) {
  const formatted = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatted;
}
