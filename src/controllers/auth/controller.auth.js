const passport = require("passport");
const Route = require("../../router/Class.Router");
const NodemailerAdapter = require("../../adapters/nodemailer.adapter");
const correo = new NodemailerAdapter();

const { UserManager} = require("../../dao/mongoClassManagers/userClass/userMongoManager");
const userBD = new UserManager();

const { isValidPasswordMethod, createHash} = require("../../utils/cryptPassword");

const { MongoCartManager} = require("../../dao/mongoClassManagers/cartsClass/cartMongoManager");
const cartsMongo = new MongoCartManager();

class AuthRouter extends Route {
  init() {

    //Login
    this.post("/", ["PUBLIC"], passport.authenticate("login", { failureRedirect: "/api/auth/failLogin"}),
      async (req, res) => {
        try {
          if (!req.user) {
            return res.status(400).json({ error: "Credenciales inválidas" });
          } else {
            //console.log(req.user._id);

            req.session.destroy;
            req.session.user = {
              idd: req.user._id,
              first_name: req.user.first_name,
              last_name: req.user.last_name,
              age: req.user.age,
              email: req.user.email,
              role: "usuario",
              last_connection: req.user.last_connection,
            };

            
            cartsMongo.addCart(req.user._id, {
              user_id: req.user._id,
              products: {},
            });
            
            
            const dateNow = new Date();
            await userBD.updateConnection(req.user.email, dateNow);

            res.sendSuccess(req.user);
          }
        } catch (error) {
          req.logger.error("Usuario no autenticado");
        }
      }
    );

    //Reset de Contraseña
    this.post("/passwordReset", ["PUBLIC"], async (req, res) => {
      try {
        const expirationTime = new Date().getTime() + 3600000;
        let linkMold = req.protocol + "://" + req.get("host");
        const url = linkMold + `/passwordReset/${expirationTime}`;
        const email = { email: req.body.user };
        req.session.destroy;
        req.session.expirationTime = expirationTime;
        req.session.email = email;
        const mensaje = {
          message: `<div> <h1>Hola!</h1> <h2>Este es el link para recuperar tu contreseña</h2> <h3> ${url}</h3> </div>`,
          subject: "Recuperacion  de contraseña",
        };
        const emailSend = await correo.sendNotification(email, mensaje);
        console.log(emailSend);
        res.json({ emailSend });
      } catch (error) {
        res.sendServerError(`something went wrong ${error}`);
      }
    });

    // actulizacion de contraseña
    this.post("/passwordUpdate", ["PUBLIC"], async (req, res) => {
      try {
        const pw1 = req.body.newPassword1;
        const pw2 = req.body.newPassword2;
        const email = req.session.email.email;
        const user = await userBD.findUser(email);
        if (pw1 === pw2) {
          if (isValidPasswordMethod(pw1, user)) {
            console.log("contraseña igual a la anterior");
            res.json({
              mesagge: "Contraseña igual a la anterior, usar una nueva.",
            });
          } else {
            await userBD.updatePassword(email, createHash(pw1));
            res.json({ mesagge: "Contraseña actualizada" });
          }
        } else {
          res.json({ mesagge: "Contraseñas no coinciden." });
        }
      } catch (error) {
        res.sendServerError(`something went wrong ${error}`);
      }
    });

    //fallo de Login
    this.get("/failLogin", ["PUBLIC"], (req, res) => {
      try {
        res.json({ error: "Falló el login" });
      } catch (error) {
        res.sendServerError(`something went wrong ${error}`);
      }
    });

    //LogOut
    this.get("/logout", ["PUBLIC"], (req, res) => {
      try {
        req.session.destroy((err) => {
          if (err) {
            res.json({ msg: err });
          }
          res.redirect("/login");
        });
      } catch (error) {
        res.sendServerError(`something went wrong ${error}`);
      }
    });
    


    this.get(
      "/github",
      ["PUBLIC"],
      passport.authenticate("github", { scope: ["user:email"] }),
      async (req, res) => {}
    );

    this.get(
      "/githubcallback",
      ["PUBLIC"],
      passport.authenticate("github", { failureRedirect: "/login" }),
      async (req, res) => {
        try {
          req.session.user = req.user;
          const fechaActual = new Date();
          await userBD.updateConnection(req.user.email, fechaActual);
          res.redirect("/products");
        } catch (error) {
          res.sendServerError(`something went wrong ${error}`);
        }
      }
    );

    this.get(
      "/google",
      ["PUBLIC"],
      passport.authenticate("google", { scope: ["profile"] }),
      async (req, res) => {}
    );

    this.get(
      "/google/callback",
      ["PUBLIC"],
      passport.authenticate("google", { failureRedirect: "/login" }),
      async (req, res) => {
        try {
          req.session.user = req.user;
          const fechaActual = new Date();
          await userBD.updateConnection(req.user.email, fechaActual);
          res.redirect("/products");
        } catch (error) {
          res.sendServerError(`something went wrong ${error}`);
        }
      }
    );


  }
}

module.exports = AuthRouter;
