const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ status: "error", message: "Not found" });
    }
    res.json({ status: "success" });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUser
};