const router=require('express').Router();

router.route("/").get((req,res,next)=>{
    return res.json({"message":"Admin route only"});
})

module.exports=router;