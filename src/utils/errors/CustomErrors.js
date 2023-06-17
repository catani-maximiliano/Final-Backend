/**La clase CustomError tiene un método estático llamado createError que recibe un objeto con cuatro 
 * propiedades opcionales: name, cause, message, y code. El método crea una nueva instancia de la clase 
 * Error con el mensaje pasado en la propiedad message, y asigna las propiedades name, cause, y code a las 
 * correspondientes pasadas en el objeto. */
class CustomError{
    static createError = ({name = "Error", cause, message, code = 1}) => {
        const error = new Error(message);
        error.name = name;
        error.cause = cause;
        error.code = code;
        
        throw error;
    }

}

module.exports = CustomError;