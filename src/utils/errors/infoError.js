const enumErrors = require("./enumErrors");

require("colors")

/**La función generateErrorInfo recibe un código de error y un objeto que contiene información sobre el error. 
 * Si el código es enumErrors.INVALID_TYPES_ERROR, la función devuelve un mensaje indicando que algunos datos son 
 * inválidos o inexistentes, junto con una lista de los datos requeridos y los valores recibidos. 
 * Si el código es enumErrors.DATABASE_ERROR, la función devuelve un mensaje similar que enumera los datos requeridos 
 * para la conexión a la base de datos. 
 * Si el código es enumErrors.ROUTING_ERROR, la función devuelve un mensaje indicando que la ruta buscada no existe. 
 * En todos los casos, el mensaje se devuelve en formato de texto rojo. */
const generateErrorInfo = (code, obj) => {
    if(code === enumErrors.INVALID_TYPES_ERROR){
        const response = `Algunos de los datos son inválidos o inexistentes.
        Lista de datos requeridos:
            *first_name: debe ser un string, se recibió ${obj.first_name}.
            *last_name: debe ser un string, se recibió ${obj.last_name}.
            *email: debe ser un string, se recibió ${obj.email}.
            *age: debe ser un number, se recibió ${obj.age}
        `
        return response.red;
    }
    
    if(code === enumErrors.DATABASE_ERROR){
        const response = `Algunos de los datos son inválidos o inexistentes.
        Lista de datos requeridos:
            *User: debe ser un string, se recibió ${obj.dbUser}.
            *Password: debe ser un string, se recibió ${obj.dbPassword}.
            *Host: debe ser un string, se recibió ${obj.dbHost}.
            *Name: debe ser un string, se recibió ${obj.dbName}.
        `
        return response.red;
    }

    if(code === enumErrors.ROUTING_ERROR){
        const response = `Algunos de los datos son inválidos o inexistentes.
        La ruta buscada no existe.
        `
        return response.red;
    }
    
}

module.exports = generateErrorInfo;