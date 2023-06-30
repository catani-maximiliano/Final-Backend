const mongoose = require("mongoose");

const ticketsCollection = "tickets";

const ticketSchema = new mongoose.Schema({

    purchase_datatime: {
        type: String
    },
    amount: {
        type: Number
    },
    purchaser: {
        type: String
    },
    products: Array
      }
);

const ticketsModel = mongoose.model(ticketsCollection, ticketSchema);

module.exports = ticketsModel;