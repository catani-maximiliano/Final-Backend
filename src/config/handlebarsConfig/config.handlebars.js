const handlebars = require("express-handlebars");

/**Handlebars.js es una herramienta esencial para renderizar HTML dinámico en el lado del servidor en aplicaciones web Node.js.
 * Permite crear plantillas que contienen marcadores de posición para datos dinámicos, y luego utiliza esos marcadores de 
 * posición para renderizar el HTML con los datos proporcionados.
 */
const handlebarsConfig = (app) => {
  /**handlebars.create() es un método que se utiliza en la biblioteca Handlebars.js
   *  para crear una nueva instancia de Handlebars con configuraciones personalizadas. */
  const hbs = handlebars.create({
    /**extname: Esta opción se utiliza para especificar la extensión de los archivos de plantilla. 
      Por defecto, Handlebars asume que las plantillas tienen la extensión .handlebars o .hbs, 
      pero con esta opción se puede cambiar la extensión a cualquier otra. Por ejemplo, si se quiere
      que las plantillas tengan la extensión .html, se puede establecer extname en .html. */
    extname: ".handlebars",
    /**defaultLayout: Esta opción se utiliza para especificar el nombre de la plantilla de diseño
     * predeterminada que se utilizará si no se especifica ninguna en las plantillas individuales.
     * Por ejemplo, si se tiene una plantilla llamada home.hbs y se quiere que se utilice una plantilla
     *  de diseño llamada main.hbs por defecto, se puede establecer defaultLayout en "main". */
    defaultLayout: "main",
    /**layoutsDir: Esta opción se utiliza para especificar el directorio donde se encuentran las plantillas de diseño.
     *  Por defecto, Handlebars busca las plantillas de diseño en el directorio raíz de las plantillas (views por defecto),
     *  pero con esta opción se puede cambiar la ubicación a cualquier otro directorio. */
    layoutsDir: __dirname + "/../../views/layouts/",
    /**partialsDir: Esta opción se utiliza para especificar el directorio donde se encuentran las plantillas parciales.
     *  Las plantillas parciales son fragmentos de plantillas que se pueden reutilizar en múltiples plantillas.
     * Por defecto, Handlebars busca las plantillas parciales en un directorio llamado partials dentro del directorio
     *  raíz de las plantillas (views/partials por defecto), pero con esta opción se puede cambiar la ubicación a
     * cualquier otro directorio. */
    partialsDir: __dirname + "/../../views/partials/",
    /**runtimeOptions: Esta opción se utiliza para especificar las opciones de tiempo de ejecución de Handlebars.}
     *  Algunas de las opciones disponibles son data, compat, knownHelpers, knownHelpersOnly, noEscape, strict, entre otras.
     *  Por ejemplo, si se quiere desactivar el autoescape de las variables por defecto, se puede establecer runtimeOptions
     * en { noEscape: true }. Estas opciones permiten personalizar el comportamiento de Handlebars durante la compilación y
     * el renderizado de las plantillas. */
    runtimeOptions: {
      /**allowProtoMethodsByDefault: si se permite el acceso a los métodos del prototipo de los
       *  objetos dentro de las plantillas (por defecto es false).
       * allowProtoPropertiesByDefault: si se permite el acceso a las propiedades del prototipo
       * de los objetos dentro de las plantillas (por defecto es false)*/
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  });

  /**app.engine() es un método de Express que se utiliza para definir un motor de plantillas para la aplicación. 
   * Se utiliza para establecer una asociación entre una extensión de archivo determinada (en este caso, .handlebars o .hbs)
   *  y un motor de plantillas específico (en este caso, Handlebars.js).

El primer parámetro de app.engine() es el nombre del motor de plantillas, que se utilizará para renderizar las plantillas.
El segundo parámetro es una función que devuelve el objeto del motor de plantillas. En este caso, la función hbs.engine 
devuelve el objeto de Handlebars.js, que se utiliza para compilar y renderizar las plantillas. */
  app.engine("handlebars", hbs.engine);

  /** app.set() para establecer la carpeta de vistas y el motor de plantillas para la aplicación */
  app.set("view engine", "handlebars");

  /**También se establece que la carpeta de vistas se encuentra en un subdirectorio llamado views */
  app.set("views", __dirname + "/../../views");
};

module.exports = handlebarsConfig;
