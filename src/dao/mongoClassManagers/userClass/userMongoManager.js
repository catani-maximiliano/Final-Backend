const userModel = require("../../models/user.model");

class UserManager {
  /**Este es un método para crear un nuevo usuario en una base de datos. Toma un objeto newUser como argumento
   *  que contiene información sobre el usuario, como su nombre, correo electrónico, contraseña, etc. Luego,
   * utiliza el modelo de usuario (userModel) para crear un nuevo documento de usuario en la base de datos y
   * devuelve el documento creado como resultado de la función. Si ocurre algún error durante el proceso, se
   * lanza una excepción con información sobre el error. */
  createUser = async (newUser) => {
    try {
      const user = await userModel.create(newUser);

      return user;
    } catch (error) {
      throw new Error(error);
    }
  };

  /**Esta función findUser es una función asíncrona que busca un usuario en la base de datos a través de su correo electrónico.
     *  Toma un parámetro user que es una cadena de texto que representa el correo electrónico del usuario que se desea buscar.

La función utiliza el modelo userModel, que se espera que represente un esquema de usuario definido en una base de datos, y 
llama al método findOne() en ese modelo, pasando un objeto que contiene la propiedad email igual al correo electrónico del 
usuario que se desea buscar.

La función devuelve una promesa que resuelve en un objeto que representa al usuario si se encuentra en la base de datos, o 
en null si no se encuentra. Si ocurre algún error al buscar al usuario en la base de datos, la función lanza una excepción. */
  findUser = async (user) => {
    try {
      const response = await userModel.findOne({ email: user });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  /** 
La función findByID busca un documento de usuario en la base de datos a través de su ID. Para hacer esto, 
se utiliza el método findById proporcionado por Mongoose, que busca un documento con el ID especificado y lo devuelve. 
Si se encuentra un documento con el ID proporcionado, la función devuelve el documento del usuario. 
Si no se encuentra el documento, se lanza un error.*/
  findByID = async (id) => {
    try {
      const response = await userModel.findById(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  /**Esta función updatePassword utiliza el modelo userModel para buscar un usuario por su dirección de correo 
     * electrónico y luego actualizar su contraseña con el nuevo valor proporcionado.

El parámetro email especifica la dirección de correo electrónico del usuario cuya contraseña se actualizará.
El parámetro newPassword contiene la nueva contraseña que se asignará al usuario.
Dentro de la función, se utiliza el método findOneAndUpdate proporcionado por el modelo userModel de Mongoose para buscar 
y actualizar el usuario. La condición de búsqueda es { email }, lo que significa que se buscará un usuario cuyo campo 
email coincida con el valor proporcionado.

El segundo argumento de findOneAndUpdate es un objeto que especifica los campos que se deben actualizar. En este caso, 
se actualiza el campo password con el valor de newPassword.

Si la operación de actualización se realiza correctamente, se devuelve la respuesta del modelo como resultado. De lo 
contrario, se lanza un error con el mensaje de error correspondiente.

Es importante tener en cuenta que esta función asume que ya se ha definido y configurado el modelo userModel 
adecuadamente antes de llamar a esta función. */
  updatePassword = async (email, newPassword) => {
    try {
      const response = await userModel.findOneAndUpdate(
        { email },
        { password: newPassword }
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
La función updateRole utiliza el modelo userModel para buscar un usuario por su dirección de correo electrónico y 
luego actualizar su rol con el nuevo valor proporcionado.

El parámetro email especifica la dirección de correo electrónico del usuario cuyo rol se actualizará.
El parámetro newRole contiene el nuevo rol que se asignará al usuario.
Dentro de la función, se utiliza el método findOneAndUpdate proporcionado por el modelo userModel de Mongoose para 
buscar y actualizar el usuario. La condición de búsqueda es { email }, lo que significa que se buscará un usuario 
cuyo campo email coincida con el valor proporcionado.

El segundo argumento de findOneAndUpdate es un objeto que especifica los campos que se deben actualizar. 
En este caso, se actualiza el campo role con el valor de newRole.

Si la operación de actualización se realiza correctamente, se devuelve la respuesta del modelo como resultado.
 De lo contrario, se lanza un error con el mensaje de error correspondiente. */
  updateRole = async (email, newRole) => {
    try {
      const response = await userModel.findOneAndUpdate(
        { email },
        { role: newRole }
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = { UserManager };
