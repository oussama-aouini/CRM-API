const mongoose = require("mongoose");

const Bill = mongoose.model(
  "Bill",
  new mongoose.Schema({
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    items: {
      name: String,
      description: String,
      price: Number,
    },
    paid: Boolean,
    status: String,
    dateOfCreation: { type: Date, default: Date.now },
    deadline: Date,
    image: {
      title: String,
      src: String,
    },
    responsable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  })
);

module.exports = Bill;
