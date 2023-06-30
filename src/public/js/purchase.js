window.onload = function () {

  fetch("/api/carts/purchase", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
      
  };

