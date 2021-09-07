const mongoose = require("mongoose");

const Client = mongoose.model(
  "Client",
  new mongoose.Schema({
    active: {
      type: Boolean,
      default: true,
    },
    adress: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
      minlength: 5,
      maxlength: 100,
      trim: true,
      unique: true,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      trim: true,
    },
    numberOfProjects: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
      //minlength: 8,
    },
    phone: {
      type: Number,
      required: true,
      minlength: 8,
    },
    profilePicture: String,
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Projet",
      },
    ],
    responsable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    reclamation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reclamation",
    },
  })
);

module.exports = Client;
