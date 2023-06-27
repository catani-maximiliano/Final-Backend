const router = require("./router/index");
const handlebarsConfig = require("./config/handlebarsConfig/config.handlebars");
const { server, app } = require("./socketIO/socketServer");
const mongoConfig = require("./config/mongoConfig/config.mongo");
const cookieParser = require("cookie-parser");
const { port } = require("./config");
const passportConfig = require("./config/passportConfig/config.passport");
const swaggerRoutes = require('./utils/swagger');

mongoConfig(app);
passportConfig(app);
router(app);

app.use(cookieParser(false));
handlebarsConfig(app);

app.get("/", (req, res) => {
  res.render("index", { mesagge: "Hi from server without socket.io" });
});


// Rutas de Swagger
swaggerRoutes(app);

server.listen(port, () => {
  console.log(`Server runing at port ${port}`);
});
