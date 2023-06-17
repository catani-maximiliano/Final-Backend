const { enviroment } = require("../config/logger.config");

/**Este código está diseñado para cargar diferentes configuraciones de registro (log) dependiendo del entorno 
 * en el que se esté ejecutando la aplicación. En este caso, se utiliza un switch statement para determinar el 
 * entorno actual y cargar el archivo correspondiente.

Si el entorno es "development", se cargará el archivo "dev.logger.js", mientras que si es "production", se cargará 
"prod.logger.js". En ambos casos, se exporta el archivo para que pueda ser utilizado por otros módulos en la aplicación.

La idea detrás de esto es que las configuraciones de registro pueden variar dependiendo del entorno. Por ejemplo, 
en un entorno de producción, es probable que se quiera registrar menos información que en un entorno de desarrollo. 
Por lo tanto, al dividir las configuraciones de registro en diferentes archivos, se pueden hacer ajustes específicos 
para cada entorno sin tener que cambiar el código principal de la aplicación. */
switch (enviroment) {
    case "development":
        console.log("devLog")
        module.exports = require("./dev.logger")
        break;
    case "production":
        console.log("prodLog")
        module.exports = require("./prod.logger")
        break;

    default:
        break;
}