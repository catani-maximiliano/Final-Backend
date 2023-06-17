require("dotenv").config();
const passport = require("passport");
const local = require("passport-local");
const GitHubStrategy = require("passport-github2");
const GoogleStrategy = require("passport-google-oauth20");
const jwt = require("passport-jwt");
const { clientID_github, clientSecret_github } = require("./githubAuth.config");
const { clientID_google, clientSecret_google } = require("./googleAuth.config");
const {
  UserManager,
} = require("../dao/mongoClassManagers/userClass/userMongoManager");
const { createHash, isValidPasswordMethod } = require("../utils/cryptPassword");
const userError = require("../utils/errors/user/user.error");
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const userManager = new UserManager();

const LocalStrategy = local.Strategy;

const initializePassport = () => {

  //JWT
  /** la estrategia de autenticación basada en JWT se utiliza para verificar y decodificar tokens JWT
   *  y para realizar la autenticación de usuarios utilizando Passport. Esto permite que las rutas y
   *  controladores de la aplicación estén protegidos y solo se puedan acceder si el usuario ha iniciado sesión y
   *  ha proporcionado un token JWT válido. */
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        /**ExtractJWT.fromAuthHeaderAsBearerToken() es un método proporcionado por el paquete passport-jwt que se
    utiliza para extraer un token JWT de un encabezado de autorización HTTP en el formato Bearer.

    Este método se utiliza como valor para la opción jwtFromRequest en la configuración de la estrategia de
     autenticación JWT. Con esto se indica que se debe buscar el token JWT en el encabezado Authorization de
      la solicitud y que debe estar en el formato Bearer.

    El método fromAuthHeaderAsBearerToken() verifica si el encabezado Authorization de la solicitud está 
    presente y comienza con la palabra "Bearer". Si se cumple esta condición, se extrae el token JWT del 
    encabezado y se devuelve como una cadena. Si no se cumple, se devuelve null.

    En resumen, ExtractJWT.fromAuthHeaderAsBearerToken() es un método útil para extraer y verificar tokens
     JWT de las solicitudes HTTP y se utiliza comúnmente en la configuración de la estrategia de autenticación
      basada en JWT con Passport.*/
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: "secreto",
      },

      /**es el callback que se pasa como segundo argumento a la estrategia de autenticación JWT configurada en Passport.

      Cuando un token JWT se recibe en una solicitud, la estrategia de autenticación verifica su validez y, si es válido,
       llama a esta función de devolución de llamada. La función de devolución de llamada recibe dos argumentos: el payload 
       del token JWT y una función done.

      La función de devolución de llamada debe llamar a la función done con uno o dos argumentos para indicar el resultado 
      de la autenticación:

      Si la autenticación fue exitosa, la función done debe llamarse con el primer argumento como null y el segundo 
      argumento como el objeto de usuario autenticado. Por ejemplo, done(null, user).
      Si la autenticación falló, la función done debe llamarse con un objeto de error como primer argumento y el segundo
       argumento como false. Por ejemplo, done(new Error('Authentication failed'), false).
      En este caso, la función de devolución de llamada simplemente devuelve el payload del token JWT como el objeto de 
      usuario autenticado. Si hay algún error en la función de devolución de llamada, se pasa el error como primer argumento
       de done. */
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
    
  //REGISTRO
  /** Este código configura la estrategia de autenticación "register" utilizando PassportJS y una estrategia LocalStrategy.
   *  La estrategia espera recibir un objeto req como primer argumento, que contiene los datos de la solicitud HTTP.

La estrategia recupera los campos first_name, last_name, email y age del cuerpo de la solicitud HTTP y los utiliza para 
crear un nuevo usuario. La contraseña se cifra utilizando la función createHash que no se proporciona en este fragmento 
de código. Luego, la estrategia utiliza el método createUser del userManager para agregar el nuevo usuario a la base de datos.
 Si la operación se realiza correctamente, se llama a la función done con el objeto de usuario como segundo argumento. 
 Si ocurre un error, se llama a la función done con el objeto de error como argumento. Si el usuario ya existe en la base
  de datos, la función done se llama con null como primer argumento y false como segundo argumento.*/
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          const user = await userManager.findUser(username);

          if (!first_name || !last_name || !email || !age) {
            userError(userInfo);
          }

          if (user) {
            req.logger.error("Usuario ya existente");
            return done(null, false);
          }

          const newUserInfo = {
            first_name,
            last_name,
            email,
            age,
            role: "USER",
            password: createHash(password),
          };

          const newUser = await userManager.createUser(newUserInfo);
          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );


  /**passport.serializeUser() es un método proporcionado por el paquete passport que se utiliza 
   * para serializar el objeto de usuario y almacenar su identificador en la sesión de usuario.

La función de serialización recibe dos argumentos: el objeto de usuario user y una función done. 
La función de serialización debe llamar a la función done con dos argumentos: el primer argumento 
es null si no hay errores, y el segundo argumento es el identificador del usuario que se almacenará en la sesión.

En este caso, la función de serialización toma el objeto de usuario user y llama a la función done 
con su propiedad id como segundo argumento. Esto implica que solo se almacena el identificador del 
usuario en la sesión, no todo el objeto de usuario.

El identificador del usuario se utilizará más tarde para deserializar el objeto de usuario almacenado
 en la sesión en cada solicitud subsecuente del usuario. Para deserializar el objeto de usuario, 
 se utiliza passport.deserializeUser() */
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });


/**passport.deserializeUser() es un método proporcionado por el paquete passport que se utiliza para 
 * deserializar el objeto de usuario almacenado en la sesión de usuario.

La función de deserialización recibe dos argumentos: el identificador del usuario id almacenado en la
 sesión y una función done. La función de deserialización debe llamar a la función done con dos argumentos: 
 el primer argumento es null si no hay errores, y el segundo argumento es el objeto de usuario recuperado de la base de datos.

En este caso, la función de deserialización utiliza el id del usuario almacenado en la sesión para
 buscar el usuario correspondiente en la base de datos mediante la función userManager.findByID(id). 
 Una vez que se recupera el usuario, se llama a la función done con null como primer argumento y el 
 objeto de usuario como segundo argumento. Esto completa la deserialización del objeto de usuario almacenado en la sesión.

Es importante destacar que la función userManager.findByID(id) es específica de la implementación y 
se utiliza para buscar el usuario correspondiente en la base de datos. */
  passport.deserializeUser(async (id, done) => {
    const user = await userManager.findByID(id);
    done(null, user);
  });

  /**Este código configura una estrategia de autenticación local ("login") usando el paquete passport-local para autenticar
   *  a los usuarios en función de un nombre de usuario y una contraseña.

El método passport.use() se utiliza para agregar una nueva estrategia de autenticación al servidor. En este caso, se configura
 la estrategia "login" con una nueva instancia de LocalStrategy.

El primer argumento de passport.use() es un nombre para la estrategia. El segundo argumento es la estrategia de autenticación 
real. En este caso, se configura una nueva instancia de LocalStrategy con una función de verificación.

La función de verificación toma tres argumentos: el nombre de usuario (en este caso, el campo "user"), la contraseña y una 
función done. La función de verificación es responsable de buscar el usuario correspondiente en la base de datos, verificar 
la contraseña y llamar a la función done con el objeto de usuario correspondiente.

En este caso, la función de verificación llama a userManager.findUser(username) para buscar el usuario correspondiente en 
la base de datos. Si el usuario no existe, llama a done(null, false) para indicar que la autenticación ha fallado.

Si el usuario existe, se llama a isValidPasswordMethod(password, user) para verificar la contraseña. Si la contraseña no 
es válida, la función de verificación llama a done(null, false) para indicar que la autenticación ha fallado.

Si la contraseña es válida, se llama a done(null, user) para indicar que la autenticación ha tenido éxito y proporcionar 
el objeto de usuario correspondiente. */
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "user" },
      async (username, password, done) => {
        try {
          const user = await userManager.findUser(username);

          if (!user) {
            return done(null, false);
          }

          if (!isValidPasswordMethod(password, user)) return done(null, false);

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  /**
Este código configura una estrategia de autenticación para Passport que utiliza la API de GitHub. La estrategia se llama
 "github" y se crea una instancia de GitHubStrategy con los siguientes parámetros:

clientID: El ID del cliente registrado en la API de GitHub para la aplicación.
clientSecret: El secreto del cliente registrado en la API de GitHub para la aplicación.
callbackURL: La URL de retorno a la que se redirige después de que la autenticación se haya completado correctamente.

El tercer parámetro de la función anónima es un callback que se ejecuta después de que se haya autenticado al usuario.
 Si el usuario ya existe en la base de datos, se devuelve el usuario encontrado. De lo contrario, se crea un nuevo usuario
  con la información proporcionada por la API de GitHub y se devuelve el nuevo usuario. */
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: clientID_github,
        clientSecret: clientSecret_github,
        callbackURL: "http://localhost:3000/api/auth/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await userManager.findUser(profile._json.email);
          if (!user) {
            const newUserInfo = {
              first_name: profile._json.name,
              last_name: "",
              email: profile._json.email,
              age: "",
              role: "USER",
              password: " ",
            };

            const newUser = await userManager.createUser(newUserInfo);

            return done(null, newUser);
          }
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  /**Este es un código de Passport.js que configura una estrategia de autenticación con Google utilizando el módulo 
   * passport-google-oauth20.

La estrategia se llama "google" y se le pasa un objeto de opciones con clientID, clientSecret y callbackURL.

El segundo parámetro de la estrategia es una función de devolución de llamada que se ejecuta una vez que el usuario ha
 iniciado sesión correctamente a través de Google. La función recibe accessToken, refreshToken, profile y done como parámetros.

Dentro de la función, se busca un usuario en la base de datos utilizando el ID de Google que se encuentra en
 profile._json.sub. Si el usuario no existe, se crea uno nuevo con información obtenida de profile, y se llama a la función
  done con el usuario nuevo. Si el usuario ya existe, se llama a la función done con ese usuario. Si ocurre un error durante
   el proceso, se llama a la función done con el error. */
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: clientID_google,
        clientSecret: clientSecret_google,
        callbackURL: "http://localhost:3000/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await userManager.findUser(profile._json.sub);

          if (!user) {
            const newUserInfo = {
              //googleId: profile._json.sub,
              first_name: profile._json.given_name,
              last_name: profile._json.family_name,
              email: profile._json.email,
              age: "",
              role: "USER",
              password: "",
            };

            const newUser = await userManager.createUser(newUserInfo);

            return done(null, newUser);
          }

          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

module.exports = initializePassport;
