const router = require("express").Router();

router.get("/", (req, res) => {
   return res.json({"message":"Viewer route is accessed"}) 
});

module.exports = router;
