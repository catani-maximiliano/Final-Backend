const router = require("./router/index");
const handlebarsConfig = require("./config/handlebarsConfig/config.handlebars");
const { server, app } = require("./socketIO/socketServer");
const mongoConfig = require("./config/mongoConfig/config.mongo");
const cookieParser = require("cookie-parser");
const { port } = require("./config");
const pasportConfig = require("./config/pasportConfig/config.pasport");
const swaggerRoutes = require('./utils/swagger');

/**se utiliza para conectar y configurar una base de datos MongoDB en una 
 * aplicación Node.js utilizando la instancia de Express app. */
mongoConfig(app);

/**se utiliza para configurar y utilizar Passport.js en una aplicación Node.js utilizando la instancia de Express app. */
pasportConfig(app);

/** función personalizada que se utiliza para modularizar las rutas y los controladores
 *  de una aplicación Node.js utilizando la instancia de Express app */
router(app);

/** utiliza para integrar el middleware cookieParser en una aplicación Node.js a través de la instancia de app.
 * El parámetro booleano false se utiliza para indicar que no se debe firmar la cookie. **/
app.use(cookieParser(false));

/**función personalizada que configura y registra el motor de plantillas Handlebars en
 * una aplicación Node.js utilizando la instancia de Express app. **/
handlebarsConfig(app);

/**Este código crea una ruta GET en la ruta raíz ("/") que utiliza el motor de vistas para renderizar un archivo de 
 * plantilla llamado "index" y pasarle un objeto con una propiedad "message" establecida en "Hi from server without 
 * socket.io". Cuando se solicita la página raíz, se devuelve la respuesta con el archivo de plantilla renderizado con 
 * el mensaje especificado.
 */
app.get("/", (req, res) => {
  res.render("index", { mesagge: "Hi from server without socket.io" });
});


// Rutas de Swagger
swaggerRoutes(app);

/**
Este código inicia el servidor en el puerto especificado y muestra un mensaje en la consola indicando que el servidor 
se está ejecutando. Por ejemplo, si port es igual a 3000, el servidor se iniciará en http://localhost:3000 y se mostrará 
el mensaje Server runing at port 3000 en la consola. */
server.listen(port, () => {
  console.log(`Server runing at port ${port}`);
});
