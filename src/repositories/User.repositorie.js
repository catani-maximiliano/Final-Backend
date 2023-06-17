
/**La clase UserRepository tiene un constructor que recibe un objeto dao como argumento y lo asigna a la propiedad this.dao.
La clase tiene varios métodos que realizan operaciones relacionadas con los usuarios.
El método createUser recibe un objeto newUser como argumento y utiliza el dao para crear un nuevo usuario en la base de datos.
 Retorna el usuario creado.
El método findAll utiliza el dao para buscar y devolver todos los usuarios de la base de datos.
El método findUser recibe un argumento email y utiliza el dao para buscar y devolver un usuario con el correo electrónico
 correspondiente.
El método findById recibe un argumento id y utiliza el dao para buscar y devolver un usuario con el ID correspondiente.
El método updateUser recibe los argumentos email y newPassword y utiliza el dao para actualizar la contraseña del usuario
 correspondiente al correo electrónico proporcionado. */
class UserRepository{
    constructor(dao){
        this.dao = dao
    }

    createUser = async (newUser) => {
        try {
            const user = await this.dao.createUser(newUser);
            return user;
        } catch (error) {
            throw new Error(error)
        }
    }

    findAll = async() => {
        try {
            const response = await this.dao.findAll();
            return response;
        } catch (error) {
            throw error
        }
    }
    
    findUser = async(email) => {
        try {
            const response = await this.dao.findUser(email)
            return response;
        } catch (error) {
            console.log(error)
        }
    }

    findById = async(id) => {
        try {
            const result = await this.dao.findById(id);
            return result;            
        } catch (error) {
            console.log(error)
        }
    }

    updateUser = async(email, newPassword) => {
        try {
            await this.dao.updateUser(email, newPassword)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserRepository;