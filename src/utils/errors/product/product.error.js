
const CustomError = require("../CustomErrors.js")
const enumErrors = require("../enumErrors.js")

require("colors")

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