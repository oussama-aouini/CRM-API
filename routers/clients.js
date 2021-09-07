const Client = require("../models/client");
const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const ClientController = require("../controllers/clinets");
const upload = require("../middleware/upload");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../config/passport")(passport);

// Router for Test
router.get(
  "/test",
  passport.authenticate("client_strategy", { session: false }),
  (req, res) => {
    res.json({
      success: true,
      msg: "you are authorised",
      currentUser: req.user,
    });
  }
);

//REGISTER
router.post(
  "/register",
  passport.authenticate("admin_strategy", { session: false }),
  (req, res) => {
    const responsableId = req.user._id;
    const { name, lastName, phone, email, password, adress } = req.body;

    if (!email || !password || !name || !lastName || !phone || !adress) {
      return res.status(422).send({ error: "You must provide all infos" });
    }
    if (password.length < 6) {
      return res
        .status(422)
        .send({ error: "You must provide longer password " });
    }
    Client.findOne({ email: email }).then((user) => {
      if (user) {
        return res.status(422).send({ error: "Email already used" });
      } else {
        const newClient = new Client({
          name: name,
          lastName: lastName,
          email: email,
          phone: phone,
          adress: adress,
          password: password,
          responsable: responsableId,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newClient.password, salt, (err, hash) => {
            if (err) throw err;
            newClient.password = hash;
            newClient
              .save()
              .then((user) => {
                const payload = {
                  id: user._id,
                  name: user.name,
                };
                const jwtObj = jwt.sign(payload, "secret", { expiresIn: 3600 });
                res.json({
                  status: "registred with success",
                  user: newClient,
                  token: jwtObj,
                });
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
);
// LOGIN
router.post("/login", function (req, res, next) {
  Client.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ sucess: "False", msg: "could not find user" });
      }
      const isValid = bcrypt.compareSync(req.body.password, user.password);
      if (isValid) {
        const payload = {
          sub: user._id,
          role: "client",
        };
        const tokenOb = jwt.sign(payload, "secret", { expiresIn: 3600 });
        res
          .status(200)
          .json({
            success: true,
            token: tokenOb,
            name: user.name,
            profilePicture: user.profilePicture,
          });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "you entered the wrong password" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

// CRUD Operations
router.get("/getAllClients", ClientController.getAllClients);
router.get(
  "/getClients",
  passport.authenticate("admin_strategy", { session: false }),
  ClientController.getClients
);
router.get("/getClient/:id", ClientController.getClient);
router.put(
  "/updateClient/:id",
  upload.single("profilePicture"),
  ClientController.updateClient
);
router.put("/deactivateClient/:id", ClientController.deactivateClient);

module.exports = router;
