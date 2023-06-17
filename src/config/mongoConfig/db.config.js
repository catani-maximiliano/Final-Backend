require("dotenv").config();

module.exports = {
    dbConnet: process.env.CONNET,
    dbSessionName: process.env.DB_SESSION_NAME,
}