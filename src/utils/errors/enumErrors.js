/**
enumErrors es un objeto que define constantes utilizadas como códigos de error para clasificar diferentes 
tipos de errores que pueden ocurrir en la aplicación. En este caso, las constantes definidas son:

ROUTING_ERROR: representa un error en el enrutamiento.
INVALID_TYPES_ERROR: representa un error causado por tipos de datos no válidos.
DATABASE_ERROR: representa un error relacionado con la base de datos.
Estas constantes pueden ser utilizadas para identificar la causa de un error en el código de la aplicación y 
realizar acciones específicas dependiendo del tipo de error. */
const enumErrors = {
    ROUTING_ERROR: 1,
    INVALID_TYPES_ERROR: 2,
    DATABASE_ERROR: 3
}

module.exports = enumErrors;