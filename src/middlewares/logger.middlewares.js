const logger = require("../logger/factory.logger")

/** Este es un middleware que se utiliza para agregar un objeto logger a la solicitud (req.logger). 
 * El objeto logger es una instancia de winston.Logger y se usa para registrar mensajes en diferentes niveles
 *  de registro (fatal, error, warn, info, http, debug, trace, etc.) en diferentes destinos (console, file, mongodb, syslog, etc.).

En este caso, el middleware registra un mensaje en el nivel http con el método de solicitud, la URL y la fecha actual 
usando la instancia logger que se proporciona en la configuración del servidor. Luego, llama a next() para permitir que 
la solicitud continúe su procesamiento en los middleware y controladores subsiguientes.

Este tipo de middleware es útil para agregar una funcionalidad global a todas las solicitudes entrantes, como registrar 
mensajes en un archivo o base de datos para un posterior análisis y depuración.*/
const loggerMiddleware = (req, res, next) => {
    req.logger = logger
    req.logger.http(
        `${req.method} en ${req.url} - ${new Date().toLocaleString()}`
    )

    next();
}

module.exports = loggerMiddleware