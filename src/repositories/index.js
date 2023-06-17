const UsersDao = require("../dao/factory");
const UserRepository = require("./User.repositorie");

/**el objeto userRepository es una instancia de UserRepository que utiliza la clase UsersDao para acceder y 
 * manipular los datos de los usuarios en la base de datos. Esta instancia de userRepository se puede utilizar 
 * para realizar diversas operaciones relacionadas con los usuarios, como crear usuarios, buscar usuarios, 
 * actualizar usuarios, etc. */
const userRepository = new UserRepository(new UsersDao())

module.exports = userRepository;