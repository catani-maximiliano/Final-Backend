
/**Winston es un módulo de registro para Node.js que proporciona una gran cantidad de herramientas para registrar 
 * información de aplicaciones, como mensajes de depuración, advertencias y errores. Con Winston, es posible almacenar 
 * registros en varios lugares, como archivos, bases de datos, consola y otros destinos personalizados. 
 * Es altamente personalizable y se puede integrar fácilmente con otros marcos y bibliotecas de Node.js. */
const winston = require("winston");

/**Esto es un objeto que define los niveles de log personalizados que se pueden utilizar en Winston y los colores 
 * asociados con cada nivel. Aquí, los niveles se definen como un objeto con los siguientes nombres y valores:
También se define un objeto colors con los colores asociados con cada nivel. Por ejemplo, el nivel "fatal" se muestra en rojo.
 Esto se utiliza para personalizar la apariencia de los registros de acuerdo con su nivel de importancia. */
const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors:{
        fatal: "red",
        error: "magenta",
        warning: "yellow",
        info: "blue",
        http: "green",
        debug: "gray"
    }
}

/**creamos el objeto logger utilizando winston.createLogger(). Le pasamos un objeto de configuración que incluye 
 * los niveles personalizados y dos transportes: uno para la consola y otro para un archivo de registro.

El transporte para la consola utiliza el nivel debug y combina dos formatos: winston.format.colorize() para aplicar 
colores según el nivel y winston.format.simple() para formatear el mensaje.

El transporte para el archivo de registro utiliza el nivel error y escribe los mensajes en un archivo específico que 
se encuentra en la carpeta "logs".

Con este código, podemos personalizar los niveles de registro y los colores asociados a cada nivel, y configurar 
fácilmente un registro tanto en la consola como en un archivo de registro. */
const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports:[
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: `${process.cwd()}/src/files/logs/errors.log`,
            level: "error",
            format: winston.format.simple()
        }),
    ]
})

module.exports = logger;