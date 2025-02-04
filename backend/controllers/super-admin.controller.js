const asyncHandler = require("../middlewares/asyncHandler");
const { User } = require("../models");
const ErrorHandler = require("../utils/err");

const findUser = asyncHandler(async (req, res, next) => {
    const { email } = req.query;

    if (!email) {
        return next(new ErrorHandler("Email is required", 400));
    }

    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
        return next(new ErrorHandler("User Doesn't Exist", 404));
    }

    res.json({ user:existingUser });
});

const updateUser=asyncHandler(async(req,res,next)=>{
    const {email,role}=req.body;

    const existingUser=await User.findOne({where:{email}});

    if(!existingUser){
        next(new ErrorHandler("User Doesn't exists"));
    }

    existingUser.role=role;

    await existingUser.save();

    return res.json({"message":"Role Updated"});

});

module.exports = { findUser ,updateUser};
