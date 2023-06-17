const passport = require('passport');
const initializePassport = require('../passport.config');

const passportConfig = (app) => {
    initializePassport();
app.use(passport.initialize());
app.use(passport.session());
}

module.exports = passportConfig;