const Admin = require("../models/admin");
const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const AdminController = require("../controllers/admin");
const upload = require("../middleware/upload");

const router = express.Router();
require("../config/passport")(passport);

router.get(
  "/test",
  passport.authenticate("admin_strategy", { session: false }),
  (req, res) => {
    res.json({
      success: true,
      msg: "you are authorised",
      currentUser: req.user,
    });
  }
);
//REGISTER
router.post("/register", (req, res) => {
  const { name, lastName, phone, email, password, adress } = req.body;

  if (!email || !password || !name || !lastName || !phone || !adress) {
    return res.status(422).send({ error: "You must provide all infos" });
  }
  if (password.length < 6) {
    return res.status(422).send({ error: "You must provide longer password " });
  }
  Admin.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(422).send({ error: "Email already used" });
    } else {
      const newAdmin = new Admin({
        name,
        lastName,
        phone,
        email,
        password,
        adress,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) throw err;
          newAdmin.password = hash;
          newAdmin
            .save()
            .then((user) => {
              const payload = {
                id: user._id,
                name: user.name,
              };
              const jwtObj = jwt.sign(payload, "secret", { expiresIn: 3600 });
              res.json({
                status: "registred with success",
                user: newAdmin,
                token: jwtObj,
              });
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", function (req, res, next) {
  Admin.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ sucess: "False", msg: "could not find user" });
      }
      const isValid = bcrypt.compareSync(req.body.password, user.password);
      if (isValid) {
        console.log(user._id);
        const payload = {
          sub: user._id,
          role: "admin",
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
router.get("/getAdmins", AdminController.getAdmins);
router.get("/getAdmin/:id", AdminController.getAdmin);
router.put(
  "/updateAdmin/:id",
  upload.single("profilePicture"),
  AdminController.updateAdmin
);
router.put("/deactivateAdmin/:id", AdminController.deactivateAdmin);

module.exports = router;
