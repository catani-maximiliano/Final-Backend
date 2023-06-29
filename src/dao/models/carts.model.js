const mongoose = require("mongoose");

const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
  user_id: String,
  products: [
    {
      product: String,
      quantity: Number,
    },
  ],
});

cartSchema.pre("find", function () {
  this.populate("products.product", "title price");
});

cartSchema.pre("findOne", function () {
  this.populate("products.product", "title price");
});

const Cart = mongoose.model(cartCollection, cartSchema);

module.exports = Cart;
