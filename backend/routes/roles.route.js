const { createRole } = require('../controllers/role.controller');

const router=require('express').Router();

router.route("/create-role").post(createRole);

module.exports=router;