const mongoose = require("mongoose");
const Joi = require("joi");

const Admin = mongoose.model(
  "Admin",
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
      minlength: 8,
    },
    phone: {
      type: Number,
      required: true,
      //minlength: 8,
    },
    profilePicture: String,
    projects: [String],
  })
);

const validateAdmin = (admin) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    lastName: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
  };

  return Joi.validate(admin, schema);
};

module.exports = Admin;
