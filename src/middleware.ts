import express, { Request,Response,NextFunction } from "express"
import jwt from "jsonwebtoken"
const app = express()
const JWT_SECRET=process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
}

export const AdminVerifier = (req:Request, res:Response, next:NextFunction) => {
  const adminJWT: string = req.headers.authorization?.split(" ")[1] || "";
  const resp=jwt.verify(adminJWT,JWT_SECRET,(err,decoded)=>{
    const decodedData=JSON.parse(decoded as string)
    if(decodedData.username!==process.env.ADMIN_NAME && 
      decodedData.password!==process.env.ADMIN_PASSWORD){
        res.json({
          msg:"Invalid credentials"
        })
    }
  });
  console.log(resp)

  next();
};