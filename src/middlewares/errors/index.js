const enumErrors = require("../../utils/errors/enumErrors");


const errorHandler = (error, req, res, next) => {
    
    
    console.log(error.cause);
    
    /**
Este bloque de código usa una declaración switch para manejar diferentes tipos de errores. Dependiendo del valor 
de error.code, se envía una respuesta JSON con un mensaje de error específico al cliente.

Si el valor de error.code coincide con enumErrors.INVALID_TYPES_ERROR, enumErrors.DATABASE_ERROR, o 
enumErrors.ROUTING_ERROR, entonces se envía una respuesta con un objeto JSON con el estado "error" y el nombre del error.

Si error.code no coincide con ninguno de los casos anteriores, se envía una respuesta con un objeto JSON con el 
estado "error" y el mensaje "Error desconocido". */
    switch (error.code) {
        case enumErrors.INVALID_TYPES_ERROR:
            res.json({status: "error", error: error.name})
            break;
        case enumErrors.DATABASE_ERROR:
            res.json({status: "error", error: error.name})
            break;
        case enumErrors.ROUTING_ERROR:
            res.json({status: "error", error: error.name})
            break;
            
        default:
            res.json({status: "error", error: "Error desconocido"})
                
            break;
    }
    
    next();
    
}

module.exports = errorHandler;