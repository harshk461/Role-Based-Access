const router=require('express').Router();
const {login, signup}=require('../controllers/auth.controller');
const { roleChecker } = require('../middlewares/roleHandler');

router.route("/login").post(login);
router.route("/sign-up").post(signup)
module.exports=router;