const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");

exports.getAdmins = async (req, res) => {
  const admins = await Admin.find().select("-password");
  res.send(admins);
};

exports.getAdmin = async (req, res) => {
  const admin = await Admin.findById(req.params.id).select("-password");

  if (!admin) return res.status(404).send("admin not found...");

  res.send(admin);
};

exports.updateAdmin = async (req, res) => {
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

    const admin = await Admin.findByIdAndUpdate(id, updates, options);
    if (!admin) return res.status(404).send("This user doesn't exist...");

    res.send(admin);
  } catch (error) {
    console.log(error.message);
  }
};

exports.deactivateAdmin = async (req, res) => {
  const admin = await Admin.findByIdAndUpdate(
    req.params.id,
    { active: false },
    { new: true }
  );
  if (!admin) return res.status(404).send("This user doesn't exist...");
  res.send(admin);
};
