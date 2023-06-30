window.onload = function () {

  fetch("http://localhost:3000/api/carts/purchase", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
      
  };

