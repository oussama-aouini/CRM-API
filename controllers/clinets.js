const mongoose = require("mongoose");
const Product = require("../models/product");
const Client = require("../models/client");
const bcrypt = require("bcryptjs");

exports.getAllClients = async (req, res) => {
  const clients = await Client.find()
    .populate("invoice")
    .populate("responsable")
    .populate("product")
    .populate("reclamation")
    .select("-password");
  res.send(clients);
};
exports.getClients = async (req, res) => {
  const id = req.user._id;

  const clients = await Client.find({ responsable: id })
    .populate("invoice")
    .select("-password");
  res.send(clients);
};
exports.getClient = async (req, res) => {
  const client = await Client.findById(req.params.id)
    .populate("invoice")
    .populate("responsable")
    .populate("product")
    .populate("reclamation")
    .select("-password");
  if (!client) return res.status(404).send("client not found...");
  res.send(client);
};

exports.updateClient = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.file
      ? { ...req.body, profilePicture: req.file.path }
      : req.body;
    const options = { new: true };

    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    if (updates.product) {
      const client = await Client.findById(req.params.id);
      let product = await Product.findById(client.product);

      for (let i = 0; i < product.users.length; i++) {
        if (product.users[i] == String(client._id)) {
          let spliced = product.users.splice(i, 1);
        }
      }
      product.save();

      product = await Product.findById(updates.product);
      product.users.push(id);
      product.save();
    }

    const client = await Client.findByIdAndUpdate(id, updates, options);
    if (!client) return res.status(404).send("This user doesn't exist...");

    res.send(client);
  } catch (error) {
    console.log(error.message);
  }
};

exports.deactivateClient = async (req, res) => {
  const client = await Client.findById(req.params.id);
  const product = await Product.findById(client.product);
  if (!client) return res.status(404).send("This user doesn't exist...");

  for (let i = 0; i < product.users.length; i++) {
    if (product.users[i] == String(client._id)) {
      let spliced = product.users.splice(i, 1);
    }
  }

  client.active = false;

  client.save();
  product.save();
  res.send(client);

  // const client = await Client.findByIdAndUpdate(
  //   req.params.id,
  //   { active: false },
  //   { new: true }
  // );
  // if (!client) return res.status(404).send("This user doesn't exist...");
  // res.send(client);
};
