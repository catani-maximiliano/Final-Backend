const passport = require("passport");
const {
  UserManager,
} = require("../../dao/mongoClassManagers/userClass/userMongoManager");
const userBD = new UserManager();
const Route = require("../../router/Class.Router");

class UsersRouter extends Route {
  init() {

    //register
    this.post(
      "/",
      ["PUBLIC"],
      passport.authenticate("register", {
        failureRedirect: "/user/failRegister",
      }),
      async (req, res) => {
        try {
          req.logger.info("Nuevo usuario registrado");
          res.send({ message: "Usuario registrado" });
        } catch (error) {
          if (error.code === 11000)
            return res.status(400).json({ error: "El usuario ya existe" });
          res.status(500).json({ error: "Internal server error" });
        }
      }
    );

    //fail register
    this.get("/failRegister", ["PUBLIC"], (req, res) => {
      res.send({ error: "Falló el registro" });
    });
    
    //actualizacion de usuario//rol
    this.get("/premium/:email", ["PUBLIC"], async (req, res) => {
      try {
        const email = req.params.email;
        console.log(email)
        const user = await userBD.findUser(email);
        console.log(user.role);
        if (user.role == "USER") {
          await userBD.updateRole(email, "PREMIUM");
          res.send({ message: "Usuario actualizado" });
        } else if (user.role == "PREMIUM") {
          await userBD.updateRole(email, "USER");
          res.send({ message: "Usuario actualizado" });
        } else {
          res.send({ message: "Usuario No actualizado" });
        }
      } catch (error) {
        res.sendServerError(`something went wrong ${error}`);
      }
    });
  }
}

module.exports = UsersRouter;
