const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");

const { dbConnet, dbSessionName } = require("./db.config");

/**mongoConfig es una función que configura la conexión a una base de datos MongoDB en una
 * aplicación web Node.js mediante el uso del paquete mongoose, lo que permite a la aplicación
 *  realizar operaciones de lectura y escritura en la base de datos de manera programática. */
const mongoConfig = (app) => {
  app.use(
    session({
      /**MongoStore.create() recibe como parámetro una cadena de conexión a MongoDB para crear
       *  una instancia de almacenamiento de sesión de MongoDB. La opción useNewUrlParser se utiliza
       *  para habilitar la detección automática de la cadena de conexión, lo que es útil cuando se
       * utilizan nuevas versiones de MongoDB. */
      store: MongoStore.create({
        mongoUrl: dbSessionName,
        mongoOptions: { useNewUrlParser: true },
      }),
      /** la opción secret que se utiliza para firmar la sesión y hacerla más segura.
       * La opción resave se establece en false para evitar que las sesiones se guarden
       *  automáticamente cada vez que se realizan cambios en ellas.
       * La opción saveUninitialized también se establece en false para evitar que se creen sesiones vacías. */
      secret: "C0ntr4",
      resave: false,
      saveUninitialized: false,
    })
  );

  /**Por defecto, Mongoose utiliza la opción de consulta estricta, lo que significa que no permite la ejecución
   *  de consultas con campos que no estén definidos en el esquema del modelo. Si intentas hacer una consulta
   * con un campo no definido en el esquema, se generará un error. */
  mongoose.set("strictQuery", false);

  /** establece la conexión a la base de datos utilizando la cadena de conexión dbConnect.
   *  Si se produce un error durante la conexión, se ejecutará la función de devolución de llamada que imprimirá
   *  un mensaje de error en la consola. Si la conexión se establece correctamente, se imprimirá un mensaje de 
   * éxito en la consola. */
  mongoose.connect(dbConnet, (error) => {
    if (error) {
      console.log(`Cannot connect to db. error ${error}`);
    }
    console.log("db conected");
  });
};

module.exports = mongoConfig;
