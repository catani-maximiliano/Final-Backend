const mongoose = require("mongoose");

const usersCollection = "users"

/**El userSchema es un objeto que define la estructura de los documentos que se almacenarán en la colección 
 * de usuarios en la base de datos.
Tiene las siguientes propiedades:

first_name: Tipo de dato String. Representa el nombre del usuario. También tiene un índice definido y es requerido.
last_name: Tipo de dato String. Representa el apellido del usuario.
email: Tipo de dato String. Representa el correo electrónico del usuario. También es requerido y debe ser único.
age: Tipo de dato Number. Representa la edad del usuario.
role: Tipo de dato String. Representa el rol del usuario y solo puede tener uno de los valores especificados en el 
array ['USER', 'ADMIN', 'PREMIUM']. El valor predeterminado es 'USER'.
password: Tipo de dato String. Representa la contraseña del usuario y es requerida. */
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        index: true,
        require: true,
    },
    last_name: String,
    email: { type: String, require: true, unique: true },
    age: Number,
    role: {
        type: String,
        enum: ['USER', 'ADMIN', 'PREMIUM'],
        default: 'USER'
    },
    password: {
        type: String,
        required: true,
    },
});

const userModel = mongoose.model(usersCollection, userSchema);

module.exports = userModel;