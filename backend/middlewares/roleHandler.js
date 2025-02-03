const asyncHandler=require('./asyncHandler');

const roleChecker=asyncHandler((req,res,next)=>{
    const token=req.headers.authorization;
    console.log(token);

    next();
});

module.exports={roleChecker}
