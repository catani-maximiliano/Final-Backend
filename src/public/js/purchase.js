window.onload = function () {
    fetch(`http://localhost:3000/api/carts/purchase`)
      .then((response) => response.json())
      .then(data => {
        const template = Handlebars.compile(document.getElementById('purchase-template').innerHTML);
        const renderedHtml = template(data);
        document.getElementById('purchase').innerHTML = renderedHtml;
      })
      .catch(error => console.error(error));
  };

