const jwt = require("jsonwebtoken");
const JWT_SECRET = "parkmeright";




const fetchuser=(req,res,next)=>{
    //Get the user from the JWT token and add id to req object
    const token=req.header('auth-token');
    if(!token)
    {
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    
    try {
        
        const data=jwt.verify(token,JWT_SECRET);
        req.admin=data.adminId;
        // console.log(req.admin)
        next()
    } catch (error) {
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
}




module.exports=fetchuser;