// Espera a que el documento se haya cargado completamente
document.addEventListener("DOMContentLoaded", () => {
    // Obtiene la referencia al formulario y al elemento de respuesta
    const form = document.getElementById("formProductPost");
    const responseElement = document.getElementById("response");
  
    // Agrega un controlador de eventos para el evento de envío del formulario
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Evita el comportamiento de envío predeterminado del formulario
  
      // Obtiene los valores de los campos del formulario
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const price = document.getElementById("price").value;
      const thumbnail = document.getElementById("thumbnail").value;
      const code = document.getElementById("code").value;
      const stock = document.getElementById("stock").value;
      const status = document.getElementById("status").value;
      const category = document.getElementById("category").value;
  
      // Crea un objeto con los datos del producto
      const productData = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category
      };
  
      try {
        // Realiza una solicitud POST al endpoint con los datos del producto
        const response = await fetch("http://localhost:3000/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(productData)
        });
        
        if (response.ok) {

          // El producto se creó con éxito
          const responseData = await response.json();
          
          console.log(responseData.payload.message);
          if (responseData.status === 200) {
            responseElement.textContent = "Producto creado con éxito."; 
          } else {
            responseElement.textContent =  "Error al crear el producto.";
          }
        }
      } catch (error) {
        console.error("Ocurrió un error:", error);
        responseElement.textContent = "Ocurrió un error en la solicitud.";
      }
    });
  });
  