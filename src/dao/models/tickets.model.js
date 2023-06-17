const mongoose = require("mongoose");

const ticketsCollection = "tickets";

/**El ticketSchema es un esquema de Mongoose que define la estructura de los datos que se guardarán en la colección de 
 * tickets de la base de datos. Este esquema tiene cuatro campos:

code: el código del ticket, que debe ser único.
purchase_datatime: la fecha y hora en que se compró el ticket.
amount: el monto del ticket.
purchaser: el nombre del comprador del ticket. */
const ticketSchema = new mongoose.Schema({
    code:{
        type: String,
        unique: true
    },
    purchase_datatime: {
        type: String
    },
    amount: {
        type: Number
    },
    purchaser: {
        type: String
    }
});

const ticketsModel = mongoose.model(ticketsCollection, ticketSchema);

module.exports = ticketsModel;