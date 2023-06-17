

/** */
const { cryptPassword } = require("../utils/cryptPassword");

/**La clase UserDTO se utiliza para crear un objeto con las propiedades necesarias de un usuario para su posterior
 *  creación en la base de datos. La clase recibe un objeto de usuario y asigna sus propiedades correspondientes al 
 * objeto creado. Además, utiliza la función cryptPassword del archivo cryptPassword.js para encriptar la contraseña 
 * del usuario antes de asignarla a la propiedad 'password' del objeto. */
class UserDTO{
    constructor(user){
        this.githubId = user.githubId;
        this.googleId = user.googleId;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.age = user.age;
        this.password = cryptPassword(user.password);
        this.cart = user.cart;
        this.role = user.role;
    }
}

module.exports = UserDTO;