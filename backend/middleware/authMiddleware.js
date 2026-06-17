import jwt from 'jsonwebtoken'

export const authMiddleware = async(req,res,next)=>{
    try{

        const token = req.cookies.token

        

    if (!token) {
      return res.status(401).json({
        message: "No token found",
      });
    }
        const decoded = jwt.verify(
            token,
            process.env.SECRET_KEY
        );

        req.user = decoded;

        next();

    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Invalid token"
        });
    }
}