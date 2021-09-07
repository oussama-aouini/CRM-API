const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    subscription: {
      type: { type: String, enum: ["Gold", "Basic", "FREE"] },
      price: Number,
      features: [String],
    },
    sale: Boolean,
    recent: Boolean,
    discount: Number,
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
      },
    ],
    responsable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    dateOfCreation: { type: Date, default: Date.now },
  })
);

module.exports = Product;
