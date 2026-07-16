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

// Lets an existing admin promote another user to admin (or demote back to
// customer). This is the ONLY way an admin account gets created after the
// very first one — public signup always creates a customer.
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
 
    if (!["customer", "admin"].includes(role)) {
      return res.status(400).json({
        status: "error",
        message: "Role must be customer or admin"
      });
    }
 
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    );
 
    if (!user) {
      return res.status(404).json({ status: "error", message: "Not found" });
    }
 
    res.json({ status: "success", user });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
 
module.exports = {
  getAllUsers,
  deleteUser,
  updateUserRole
};