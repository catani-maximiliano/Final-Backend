const { Router } = require("express");
const passport = require("passport");

/**
Este es un código de clase llamada "Route" que se utiliza para definir rutas en una aplicación web. La clase tiene métodos 
para definir rutas HTTP utilizando los verbos HTTP GET, POST, PUT y DELETE. También tiene un método para aplicar políticas 
de seguridad a las rutas y generar respuestas personalizadas.

El método "getRouter" devuelve el router de Express que se utiliza para manejar las rutas definidas en la clase. El método 
"init" se utiliza para inicializar la clase y se puede sobrescribir en las clases que heredan de "Route".

Los métodos "get", "post", "put" y "delete" se utilizan para definir rutas HTTP y sus controladores. Cada uno de estos métodos 
acepta una cadena que representa la ruta, un array de políticas de seguridad y uno o más controladores de rutas. Los 
controladores de rutas son funciones que se ejecutan cuando se accede a una ruta determinada.

El método "applyCallbacks" se utiliza para envolver los controladores de rutas con una función asincrónica que maneja los 
errores de forma consistente. El método "generateCustomResponses" se utiliza para generar respuestas personalizadas que se 
pueden utilizar en los controladores de rutas. Finalmente, el método "handlePolicies" se utiliza para aplicar políticas de 
seguridad a las rutas. Si una política de seguridad falla, la función redirige al usuario a la página de inicio de sesión.

En resumen, esta clase es una herramienta útil para definir rutas y controladores de rutas en una aplicación web de forma 
modular y escalable. */ 
class Route {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}

  /**path: la ruta de la solicitud HTTP.
policies: una lista de políticas de acceso para proteger la ruta.
callbacks: una lista de funciones que se ejecutarán cuando se haga una solicitud HTTP a esta ruta. */
  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks)
    );
  }

  /**El método applyCallbacks toma una serie de callbacks y los envuelve en una nueva función asincrónica que se 
   * encarga de llamar a cada callback dentro de un bloque try-catch y manejar cualquier error que pueda surgir. 
   * Esta función devuelta por applyCallbacks se usa para asignarla como manejador de eventos en las rutas definidas 
   * en la clase Route.

Básicamente, applyCallbacks se encarga de encapsular cada callback en una función asíncrona y manejar los errores 
que puedan surgir durante su ejecución. */
  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        params[1].status(500).send(error);
      }
    });
  }

  /**Este método agrega tres funciones personalizadas al objeto res de Express. Estas funciones se pueden usar para enviar 
   * respuestas con diferentes códigos de estado HTTP y formatos de datos.

res.sendSuccess: envía una respuesta con código de estado 200 y un objeto que contiene el resultado de la operación realizada 
por la solicitud.
res.sendServerError: envía una respuesta con código de estado 500 y un objeto que contiene un mensaje de error del servidor.
res.sendUserError: envía una respuesta con código de estado 400 y un objeto que contiene un mensaje de error del cliente.
Todas estas funciones son útiles para manejar diferentes escenarios en los que se necesita enviar una respuesta HTTP con un 
código y formato específicos. */
  generateCustomResponses = (req, res, next) => {
    res.sendSuccess = (payload) => res.send({ status: 200, payload });
    res.sendServerError = (error) => res.send({ status: 500, error });
    res.sendUserError = (error) => res.send({ status: 400, error });
    next();
  };

  /**
La función handlePolicies se encarga de validar las políticas de seguridad que se han definido para una ruta en particular. 
Si la política es pública, se pasa al siguiente middleware sin validar nada más. Si no es pública, verifica si el usuario 
tiene una sesión iniciada, redirigiendo a la página de inicio de sesión si no la tiene. Si el usuario tiene una sesión, se 
verifica si su rol es de administrador, permitiendo el acceso si es el caso o pasando al siguiente middleware si no lo es. 
En resumen, esta función es responsable de aplicar ciertas restricciones de acceso a ciertas rutas, garantizando así que solo 
los usuarios autorizados puedan acceder a ellas. */
  handlePolicies = (policies) => {
    return async (req, res, next) => {
      if (policies[0] === "PUBLIC") {
        return next();
      }

      if (!req.session.user) {
        return res.status(200).redirect("/login");
      }

      if (req.session.user.role !== "ADMIN") {
        return next();
      }

      next();
    };
  };
}

module.exports = Route;
