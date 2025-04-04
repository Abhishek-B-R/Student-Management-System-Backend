import express, { Request,Response,NextFunction } from "express"
import jwt from "jsonwebtoken"
const app = express()
const JWT_SECRET="asdasd"

export const Verifier = async (req: Request, res: Response, next: NextFunction) => {
  const adminJWT: string = req.headers.authorization?.split(" ")[1] || "";
  try {
      const resp = jwt.verify(adminJWT, JWT_SECRET);
      next();
  } catch (e) {
      res.status(401).json({ msg: "Admin not found" });
  }
};


export const TeacherVerifier =async (req:Request, res:Response, next:NextFunction) => {
  const adminJWT: string = req.headers.authorization?.split(" ")[1] || "";
  console.log(adminJWT)
  try{
    const resp=jwt.verify(adminJWT,JWT_SECRET);
    console.log(resp)
  }catch(e){
    res.json({
      msg:"Teacher not found"
    })
  }
  next();
};

export const StudentVerifier =async (req:Request, res:Response, next:NextFunction) => {
  const adminJWT: string = req.headers.authorization?.split(" ")[1] || "";
  console.log(adminJWT)
  try{
    const resp=jwt.verify(adminJWT,JWT_SECRET);
    console.log(resp)
  }catch(e){
    res.json({
      msg:"Student not found"
    })
  }
  next();
};