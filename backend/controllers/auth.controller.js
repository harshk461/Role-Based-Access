const bcrypt = require("bcryptjs");
const asyncHandler = require("../middlewares/asyncHandler");
const { User } = require("../models")
const { generateToken } = require("../common/generateToken");
const ErrorHandler = require("../utils/err"); 
const { insertIntoRoles } = require("../services/rawQuery");
const authService=require('../services/auth.service');


exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ where:{email} });
  if (!user) {
    return next(new ErrorHandler("Invalid User", 401));
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return next(new ErrorHandler("Incorrect Password", 401));
  }
  const data = {
    id: user.id,
    email: user.email,
    role:user.role
  };

  const token = generateToken(data);

  return res.json({ status: "success", token: token });
});

exports.signup = asyncHandler(async (req, res, next) => {
  try {
    const { email, password, name, role , status = "ACTIVE" } = req.body;

    if (!email || !password || !name) {
      return next(new ErrorHandler("Email, password, and name are required", 400));
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return next(new ErrorHandler("Email is already in use", 400));
    }

    const newUser = await User.create({
      email,
      password: password,
      name,
      role,
      status,
      deleted_at: null,
    });

    const newRole = await authService.insertIntoRoles(newUser.id,role);


    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
      },
      role:{
        role:role
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    next(new ErrorHandler(error.message || "Internal server error", 500));
  }
});
