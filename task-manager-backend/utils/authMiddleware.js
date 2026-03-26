const jwt=require("jsonwebtoken");

function generateToken(userData){
    const token=jwt.sign(
        {
            username:userData.email,
            id:userData.id
        },
        process.env.JWT_SECRETE_KEY,
        {
            expiresIn:"1h"
        }
    )
    return token;
}
function verify(req,res,next){
    if(!req.headers.authorization){
        res.status(401).json({message:"no token provided"});
    }
    const token=req.headers.authorization.split(" ")[1];
    const decode=jwt.verify(token,process.env.JWT_SECRETE_KEY);
    req.user=decode;
    next()
}

module.exports={
    generateToken,
    verify
}