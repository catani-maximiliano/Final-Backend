const Chat = require("../../models/chat.model");

class MongoChatManager {

    /**
El método saveMesagge guarda un mensaje en una base de datos MongoDB utilizando la biblioteca Mongoose. 
Primero, intenta crear un documento en la colección "Chat" utilizando la función create proporcionada por Mongoose.
 Si tiene éxito, devuelve un mensaje indicando que el mensaje se ha guardado correctamente. Si hay algún error, el 
 método captura la excepción y devuelve el error. */
    async saveMesagge(mesagge) {
        try {

            const mongoSaveMesagge = await Chat.create(mesagge);
            return "mesagge saved successfully";
        }
        catch (error) {
            return error;
        }
    }

    /**
Esta función es una operación asíncrona que se utiliza para obtener todos los mensajes guardados en una base de datos MongoDB.
 Primero, se realiza una consulta a la base de datos usando el método find() de Mongoose, el cual devuelve una promesa que se
  resuelve con un arreglo de objetos que representan los mensajes guardados. Si la consulta se realiza correctamente,
   se retorna el arreglo de mensajes. Si ocurre algún error durante la consulta, se retorna el error. */
    async getMesagges() {
        try {
            const mongoGetMesagge = await Chat.find();
            return mongoGetMesagge;
        }
        catch (error) {
            return error;
        }
    }

}

module.exports = { MongoChatManager };