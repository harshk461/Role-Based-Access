const { findUser, updateUser } = require("../controllers/super-admin.controller");

const router = require("express").Router();

router.get("/find-user",findUser);
router.patch("/update-user",updateUser);
module.exports = router;
