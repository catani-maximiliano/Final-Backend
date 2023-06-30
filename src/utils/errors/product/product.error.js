//const productModel = require("../../../dao/mongo/models/products.model")
const customError = require("../customErrors")
const enumErrors = require("../enumErrors")

require("colors")

const productError = (pid, obj) => {

    if(!obj.title || !obj.description || !obj.price || !obj.thumbail || !obj.code || !obj.stock || !obj.category){
        customError.createError({
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