const jwt = require("jsonwebtoken");

const generateToken = (data) => {
  console.log(data);
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "15d" });
};

module.exports = { generateToken };
