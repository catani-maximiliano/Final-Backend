const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");

const { dbConnet, dbSessionName } = require("./db.config");

const mongoConfig = (app) => {
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: dbSessionName,
        mongoOptions: { useNewUrlParser: true },
      }),
      secret: "ContraseñaSecreta",
      resave: false,
      saveUninitialized: false,
    })
  );

  mongoose.set("strictQuery", false);

  mongoose.connect(dbConnet, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: {
      w: "majority",
      wtimeout: 1000,
    },
  })
    .then(() => {
      console.log("db connected");
    })
    .catch((error) => {
      console.log(`Cannot connect to db. error ${error}`);
    });
};

module.exports = mongoConfig;
