const mongoose = require('mongoose');

const chatCollection = 'chat';

/**El código muestra la definición de un esquema de Mongoose para un modelo de chat. El modelo de chat tiene dos propiedades: 
 * "user" y "message", ambas son de tipo String.

Este esquema se utiliza para crear documentos en la base de datos de MongoDB, lo que significa que cada documento que se cree 
utilizando este esquema tendrá dos campos: "user" y "message".

Cada vez que se inserta un documento en la colección de chats, se creará un objeto con un usuario y un mensaje y se almacenará
 en la base de datos. Luego, se pueden recuperar estos documentos y mostrarlos en la interfaz de usuario de la aplicación. */
const chatSchema = new mongoose.Schema({
    user: String,
    message: String
});

/**La línea de código const Chat = mongoose.model(chatCollection, chatSchema); está definiendo un modelo de Mongoose 
 * llamado "Chat" utilizando el esquema chatSchema y lo asigna a la constante Chat. Esto significa que ahora podemos
 *  utilizar el modelo Chat para realizar operaciones CRUD (crear, leer, actualizar y eliminar) en la colección "chats" 
 * de la base de datos. Por ejemplo, podemos crear un nuevo documento de chat utilizando const newChat = new Chat({ user:
 *  "Alice", message: "Hola Bob!" }); y guardarlo en la base de datos utilizando await newChat.save();. */
const Chat = mongoose.model(chatCollection, chatSchema);

module.exports = Chat;