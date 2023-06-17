const passport = require('passport');
const Route = require("../../router/Class.Router");

class AuthRouter extends Route {
  init() {
    this.post('/', ['PUBLIC'], passport.authenticate('login', { failureRedirect: '/api/auth/failLogin' }), async (req, res) => {
      try {
        if (!req.user)
          return res.status(400).json({ error: 'Credenciales invalidas' });

        req.session.user = {
          first_name: req.user.first_name,
          last_name: req.user.last_name,
          age: req.user.age,
          email: req.user.email,
          role: "usuario",
        };

        res.sendSuccess(req.user);

      } catch (error) {
        //res.sendServerError(`something went wrong ${error}`)
        req.logger.error("Usuario no autenticado")
      }

    })

    this.get('/failLogin', ['PUBLIC'], (req, res) => {
      try {
        res.json({ error: 'Falló el login' });
      }
      catch (error) {
        res.sendServerError(`something went wrong ${error}`)
      }
    })

    this.get('/github', ['PUBLIC'],
      passport.authenticate('github', { scope: ['user:email'] }),
      async (req, res) => { }
    )

    this.get('/githubcallback', ['PUBLIC'],
      passport.authenticate('github', { failureRedirect: '/login' }),
      async (req, res) => {
        try {
          req.session.user = req.user;
          res.redirect('/products');
        }
        catch (error) {
          res.sendServerError(`something went wrong ${error}`)
        }
      }
    )

    this.get('/google', ['PUBLIC'],
      passport.authenticate('google', { scope: ['profile'] }),
      async (req, res) => { }
    )

    this.get('/google/callback', ['PUBLIC'],
      passport.authenticate('google', { failureRedirect: '/login' }),
      async (req, res) => {
        try {
          req.session.user = req.user;
          res.redirect('/products');
        }
        catch (error) {
          res.sendServerError(`something went wrong ${error}`)
        }
      }
    )

    this.get('/logout', ['PUBLIC'], (req, res) => {
      try {
        req.session.destroy(err => {
          if (err) {
            res.json({ msg: err })
          }
          res.redirect("/login");
        })
      }
      catch (error) {
        res.sendServerError(`something went wrong ${error}`)
      }
    })
  }
}

module.exports = AuthRouter;