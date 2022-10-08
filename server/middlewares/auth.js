import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// auth middleware help to verify if the user is authenticated
// click the like button => auth middleware => verify user (NEXT) => like the post


export const auth = async (req,res,next)=>{
     try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length<500;
        let decodedData;
        if(token&&isCustomAuth){
            decodedData = jwt.verify(token,process.env.JWT_SECRET_KEY);
            req.userId = decodedData?.id;
        }else{
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next();
     } catch (error) {
        return res.status(500).json({message:"Something went wrong Please try again"});
     }
}