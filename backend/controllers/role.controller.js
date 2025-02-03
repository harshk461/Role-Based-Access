const asyncHandler = require("../middlewares/asyncHandler");
const { Roles } = require('../models/index');

const createRole = asyncHandler(async (req, res, next) => {
  const { role, user_id } = req.body;

  const existingRole = await Roles.findOne({ where: { role } });
  if (existingRole) {
    return res.status(400).json({
      success: false,
      message: "Role already exists",
    });
  }

  const newRole = await Roles.create({
    role,
    user_id, 
  });

  return res.status(201).json({
    success: true,
    message: "Role created successfully",
    data: newRole,
  });
});

module.exports = { createRole };
