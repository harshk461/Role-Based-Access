const router=require('express').Router();

const {  createOrUpdatePermission } = require('../controllers/permissions.controller');


router.route("/create").post(createOrUpdatePermission)
router.route("/update").patch(createOrUpdatePermission);

module.exports=router;