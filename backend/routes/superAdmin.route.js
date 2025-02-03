const router = require("express").Router();
const { verifyRole } = require("../middlewares/authMiddleware");

// Super Admin-only route
router.get("/manage-users", (req, res) => {
  res.json({ message: "Welcome, Super Admin! Manage your users here." });
});

module.exports = router;
