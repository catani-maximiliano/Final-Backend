const socket = io();

/**Este código define una función asíncrona llamada swal. Esta función utiliza la librería SweetAlert2 para mostrar 
 * un diálogo al usuario solicitando que se identifique en el chat. Una vez que el usuario introduce su nombre de usuario 
 * y lo envía, se establece una conexión con el servidor de Socket.io y se emite un evento "newUser" con el nombre de usuario.
 *  Luego, se añade un event listener al campo de entrada de mensajes (chatBox) para que cuando se presione la tecla "Enter",
 *  se comprueba si hay un mensaje válido para enviar y, en caso afirmativo, se emite un evento "message" con el mensaje y 
 * el nombre de usuario. */
const swal = async () => {
  const chatBox = document.getElementById("chatBox")
  const result = await Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingresa el usuario para identificarte en el chat",
    inputValidator: value => {
      return !value && "Necesitas escribir un nombre de usuario para continuar!"
    },
    allowOutsideClick: false
  })
  const user = result.value
  socket.emit('newUser', user)

  chatBox.addEventListener('keyup', e => {
    if (e.key === "Enter") {
      if (chatBox.value.trim().length > 0) {
        const message = {
          user: user,
          message: chatBox.value
        }
        socket.emit("message", message)
      }
    }
  })
}
swal()

/**Este código se ejecuta cuando el cliente recibe un mensaje de bienvenida del servidor a través del socket con el nombre 
 * "bienvenida". Luego, se actualiza el contenido del elemento HTML con el ID "bienvenida" para mostrar un mensaje de bienvenida
 *  al usuario que se conecta al chat. También se actualiza el contenido del elemento HTML con el ID "instructions" para 
 * mostrar algunas instrucciones sobre cómo usar el chat. El mensaje de bienvenida y las instrucciones se construyen mediante 
 * cadenas de texto HTML y se asignan al atributo innerHTML de los elementos correspondientes. */
socket.on("bienvenida", data => {
    const bienvenida = document.getElementById("bienvenida");
    const instructions = document.getElementById("instructions");
    let bienvenidaDOM = `Bienvenido al chat ${data}</br>`;
    let instructionsDOM = `<h4>Instrucciones para usar el chat</h4>
    <p>Escribir mensaje en el recuadro blanco y preionar enter para enviar mensaje</p>`;
    bienvenida.innerHTML = bienvenidaDOM;
    instructions.innerHTML = instructionsDOM;
  })
  
  /**Este fragmento de código es un listener de eventos en el cliente para recibir y mostrar en el HTML los mensajes previamente
   *  enviados en el chat. Cuando se recibe el evento "messageLogs" con un arreglo de objetos de mensaje como datos, se genera 
   * un string de HTML que contiene cada uno de los mensajes y se agrega al contenido del elemento con ID "messageLogs" del HTML.
   *  Cada mensaje se compone del nombre de usuario y el mensaje enviado por ese usuario. */
socket.on("messageLogs", data => {
  const log = document.getElementById("messageLogs")
  let messages = ""
  data.forEach(message => {
    messages += `${message.user} dice: ${message.message}</br>`
  })
  log.innerHTML = messages
})