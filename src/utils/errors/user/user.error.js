const CustomError = require("../customErrors");
const enumErrors = require("../enumErrors");
const generateErrorInfo = require("../infoError");

/**La función userError es un error handler que se encarga de crear un error personalizado cuando los datos proporcionados 
 * para crear un usuario son inválidos. Esta función utiliza otra función llamada generateErrorInfo para generar un mensaje
 *  detallado sobre el tipo de dato esperado y el tipo de dato recibido para cada campo de usuario.

El objeto userInfo es el argumento que se le pasa a la función userError. Este objeto debe contener los datos del usuario 
a crear, como su nombre, correo electrónico, contraseña, etc.

Si alguno de los campos es inválido, se crea un error personalizado utilizando la función CustomError.createError. 
El error contendrá el nombre del error, una descripción detallada de la causa del error utilizando la función 
generateErrorInfo, un mensaje descriptivo y un código de error generado a partir de enumErrors.INVALID_TYPES_ERROR. */
const userError = (userInfo) => {
    CustomError.createError({
        name: "Error al crear el usuario",
        cause: generateErrorInfo(enumErrors.INVALID_TYPES_ERROR, userInfo),
        message: "Error por datos no válidos",
        code: enumErrors.INVALID_TYPES_ERROR,
    });
}

module.exports = userError;