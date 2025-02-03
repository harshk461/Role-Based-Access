const asyncHandler = require("../middlewares/asyncHandler");
const { Permission } = require('../models/index');
const ErrorHandler = require("../utils/err");

const createOrUpdatePermission = asyncHandler(async (req, res, next) => {
  const { role, permissions } = req.body;

  if (!Array.isArray(permissions)) {
    return next(new ErrorHandler("Permissions must be an array", 400));
  }

  const existingPermission = await Permission.findOne({ where: { role } });

  if (existingPermission) {
    existingPermission.permissions = permissions;
    await existingPermission.save();

    return res.status(200).json({
      success: true,
      data: existingPermission
    });
  }

  const newPermission = await Permission.create({
    role,
    permissions
  });

  res.status(201).json({
    success: true,
    data: newPermission
  });
});

module.exports = { createOrUpdatePermission };


