const mongoose = require("mongoose");

const ticketsCollection = "tickets";


const ticketSchema = new mongoose.Schema({
    purchase_datatime: String,
    amount: Number,
    purchaser_id: String,
    purchaser:String,
    purchaser_email: String,
});

const ticketsModel = mongoose.model(ticketsCollection, ticketSchema);

module.exports = ticketsModel;