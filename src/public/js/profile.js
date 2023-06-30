window.onload = function() {
  fetch(`https://final-backend-production-f554.up.railway.app/api/sessions/current`)
    .then(response => response.json())
    .then(data => procesarDatos(data.payload))
    .catch(error => console.error(error));
};


const profile = document.getElementById("profile");
const cartel = document.getElementById("cartel");

function procesarDatos(data) {
  console.log(data)
    profile.innerHTML =   
    `<h2>Profile</h2>
    <p>Id: ${data.id}</p>
    <p>Name: ${data.first_name} ${data.last_name}</p>
    <p>Age: ${data.age}</p>
    <p>Email: ${data.email}</p>
    <p>Role: ${data.role}</p>`
    ;
 
}