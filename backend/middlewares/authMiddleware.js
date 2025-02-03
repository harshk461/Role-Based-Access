const jwt = require("jsonwebtoken");


const verifyRole = (roles) => (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied! No Token Provided" });
  }
  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    console.log(verified);
    req.user = verified;

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access Denied! Unauthorized Role" });
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = { verifyRole };
