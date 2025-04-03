import express from "express"
import jwt from "jsonwebtoken";
import { StudentProps, TeacherProps } from "./types";
import { PrismaClient } from "@prisma/client";
import cors from "cors"
import { departmentIdFetch, subjectIdFetch } from "./functions";
import { AdminVerifier } from "./middleware";

const app=express()
const client=new PrismaClient()
app.use(express.json())
app.use(cors())

const JWT_SECRET=process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
}

app.post("/adminSignIn",async (req,res)=>{
    const{username,password}:{username:string,password:string}=req.body
    const hash=jwt.sign({
        username,password
    },JWT_SECRET)

    if(username===process.env.ADMIN_NAME && password===process.env.ADMIN_PASSWORD){
        res.json({
            msg:"Login Successful",
            jwt:hash
        })
    }else{
        res.json({
            msg:"Invalid credentials"
        })
    }
})

app.post("/registerStudent",AdminVerifier,async (req,res)=>{
    const {username,dob,email,password,yearOfJoining,department,parentEmail}:StudentProps=req.body;
    const adminJWT: string = req.headers.authorization?.split(" ")[1] || "";
    const hashedPassword=jwt.sign(password,JWT_SECRET);
    let [year,month,date]=dob.split("-");
    const departmentId=await departmentIdFetch(department)
    if (!departmentId?.id) {
        res.status(400).json({ msg: "Invalid department" });
        return;
    }

    const dbresp=await client.student.count({
        where:{
            departmentId:departmentId?.id,
            yearOfJoining
        }
    }) + 1
    let usn=`${yearOfJoining%100}B${department}`
    if(dbresp < 10)                         usn += "00"+dbresp
    else if(dbresp >= 10 && dbresp < 100)   usn += "0"+dbresp
    else                                    usn += dbresp

    await client.student.create({ data: {
        username,
        email,
        password:hashedPassword,
        date:parseInt(date),
        month:parseInt(month),
        year:parseInt(year),
        usn,
        yearOfJoining,
        parentEmail,
        departmentId: departmentId.id
    }})
    res.json({
        message:"SignUp successful",
        jwt:hashedPassword
    })
})

app.post("/registerTeacher",AdminVerifier,async function(req,res){
    const {username,email,password,division,subject}:TeacherProps=req.body;
    const hashedPassword=jwt.sign(password,JWT_SECRET);
    const subjectId=await subjectIdFetch(subject)

    if (!subjectId?.id) {
        res.status(400).json({ msg: "Invalid subject" });
        return;
    }
    await client.teacher.create({
        data:{
            username,
            email,
            division,
            subjectId:subjectId?.id,
            password:hashedPassword,
            noOfClassTaken:0
        }
    })

    res.json({
        message:"SignUp successful",
        jwt:hashedPassword
    })
})

app.post("/studentSignIn",async (req,res)=>{
    const {email,password}=req.body;
    const hashedPassword=jwt.sign(password,JWT_SECRET);
    const data = await client.student.findFirstOrThrow({
        where:{
            email,password:hashedPassword
        }
    })
    res.json({
        jwt:hashedPassword
    })
})

app.post("/teacherSignIn",async (req,res)=>{
    const {email,password}=req.body;
    const hashedPassword=jwt.sign(password,JWT_SECRET);
    const data = await client.teacher.findFirstOrThrow({
        where:{
            email,password:hashedPassword
        }
    })
    res.json({
        jwt:hashedPassword
    })
})

app.post("/parentSignIn",async (req,res)=>{
    const {usn,dob}=req.body;
    let [year,month,date]=dob.split("-");
    const data = await client.student.findFirst({
        where:{
            usn,
            date:parseInt(date),
            month:parseInt(month),
            year:parseInt(year),
        }
    })
    if(!data){
        res.json({
            msg:"User not found"
        })
    }

    res.json({
        data
    })
})

app.post("/forgotPasswordTeacher",async (req,res)=>{
    const {email,password}:{email:string,password:string}=req.body
    // TODO: verify email, if correct then -
    await client.teacher.update({
        where:{
            email
        },data:{
            password
        }
    })
    res.json({
        msg:"Password has been updated"
    })
})

app.post("/forgotPasswordStudent",async (req,res)=>{
    const {usn,email,password}:{usn:string,email:string,password:string}=req.body
    if(!email){
        const emailObj=await client.student.findFirstOrThrow({
            where:{usn},
            select:{email:true}
        })
        const email=emailObj.email
    }
    // TODO: verify email, if correct then -
    await client.student.update({
        where:{
            email
        },data:{
            password
        }
    })
    res.json({
        msg:"Password has been updated"
    })
})

app.listen(3000)