//const productModel = require("../../../dao/mongo/models/products.model")
const CustomError = require("../customErrors")
const enumErrors = require("../enumErrors")

require("colors")

/**Este es un ejemplo de una función llamada productError que se encarga de verificar si los datos de un 
 * producto son válidos antes de agregarlo a la base de datos. La función toma dos parámetros, pid que es el 
 * ID del producto y obj que es un objeto que contiene los datos del producto.

En la función, se verifica si alguno de los campos del objeto son nulos o indefinidos. Si se encuentra alguno 
de estos casos, se crea un error personalizado utilizando una librería llamada CustomError. El error personalizado 
contiene información detallada sobre el error que se produjo, incluyendo el campo que no es válido y el tipo esperado.

Este tipo de validación es útil para garantizar la integridad de los datos almacenados en la base de datos y 
prevenir errores posteriores debido a datos incorrectos o incompletos. */
const productError = (pid, obj) => {

    if(!obj.title || !obj.description || !obj.price || !obj.thumbail || !obj.code || !obj.stock || !obj.category){
        CustomError.createError({
            name: "Error al agregar el producto",
            cause: `Alguno de los datos son inválidos:
            *Título: Se esperaba un string, se recibió: ${obj.title}
            *Description: Se esperaba un string, se recibió: ${obj.description}
            *Price: Se esperaba un number, se recibió: ${obj.price}
            *Thumbail: Se esperaba un string, se recibió: ${obj.thumbail}
            *Code: Se esperaba un string, se recibió: ${obj.code}
            *Stock: Se esperaba un number, se recibió: ${obj.stock}
            *Category: Se esperaba un string, se recibió: ${obj.category}`.red,
            message: "Error por datos inválidos",
            code: enumErrors.INVALID_TYPES_ERROR 
        })
    }
}

module.exports = productError