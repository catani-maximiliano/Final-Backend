window.onload = function () {

  fetch("https://final-backend-production-f554.up.railway.app/api/carts/purchase", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
      
  };

