import express from "express"
import jwt from "jsonwebtoken";
import { AllocationProps, StudentProps, TeacherProps } from "./types";
import { PrismaClient } from "@prisma/client";
import cors from "cors"
import { departmentIdFetch, generateOTP, incrementChar, sendOTPEmail, subjectIdFetch } from "./functions";
import { Verifier } from "./middleware";
import { userInfo } from "os";

const app=express()
const client=new PrismaClient()
app.use(express.json())
app.use(cors())

const JWT_SECRET="asdasd"

app.post("/adminSignIn",async (req,res)=>{
    const{username,password}:{username:string,password:string}=req.body
    const hash=jwt.sign({
        username,password,role:"admin"
    },JWT_SECRET)

    if(username===process.env.ADMIN_NAME && password===process.env.ADMIN_PASSWORD){
        res.json({
            msg:"Login Successful",
            jwt:hash,
            role:"admin"
        })
    }else{
        res.json({
            msg:"Invalid credentials"
        })
    }
})

// app.use(Verifier);

app.post("/registerStudent",async (req,res)=>{
    const {username,dob,email,yearOfJoining,department,parentEmail}:StudentProps=req.body;
    const password="student@123"    
    const hashedPassword = jwt.sign(password, JWT_SECRET);    
    let [year,month,date]=dob.split("-");
    const departmentId=await departmentIdFetch(department)
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

app.post("/registerTeacher",async function(req,res){
    const {username,email}:TeacherProps=req.body;
    console.log(username,email)
    const password="faculty@123"
    const hashedPassword=jwt.sign(password,JWT_SECRET);

    await client.teacher.create({
        data:{
            username,
            email,
            password:hashedPassword,
        }
    })

    res.json({
        message:"SignUp successful",
        jwt:hashedPassword
    })
})

app.post("/allocateTeacher",async (req,res)=>{
    const {email,division,department,subject}:AllocationProps=req.body
    const subjectId=await subjectIdFetch(subject)
    const teacherId=await client.teacher.findFirstOrThrow({
        where:{
            email
        }
    })
    const departmentId=await departmentIdFetch(department)
    await client.allocations.create({
        data:{
            teacherId:teacherId.id,
            division,
            departmentId:departmentId.id,
            subjectId:subjectId?.id,
            noOfClassTaken:0
        }
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
    const usn=data.usn;
    const studentJWT=jwt.sign({
        usn,email,role:"student"
    },JWT_SECRET)
    res.json({
        jwt:studentJWT,
        role:"student"
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
    const teacherJWT=jwt.sign({
        email,role:"teacher"
    },JWT_SECRET)
    res.json({
        jwt:teacherJWT,
        role:"teacher",
        name:data.username
    })
})

app.post("/parentSignIn",async (req,res)=>{
    const {usn,dob}=req.body;
    let [year,month,date]=dob.split("-");
    const data = await client.student.findFirstOrThrow({
        where:{
            usn,
            date:parseInt(date),
            month:parseInt(month),
            year:parseInt(year),
        }
    })
    const parentJWT=jwt.sign({
        usn,role:"parent"
    },JWT_SECRET)
    res.json({
        data,
        hash:parentJWT,
        role:"parent"
    })
})

app.put("/forgotPassword",async (req,res)=>{
    const {email,password}:{email:string,password:string}=req.body
    const otp=generateOTP();
    await sendOTPEmail(email,otp);
    try{
        await client.otp.create({
            data:{
                email,
                OTP:parseInt(otp),
                password
            }
        })
    }catch(e){
        await client.otp.update({
            where:{
                email
            },data:{
                OTP:parseInt(otp)
            }
        })
    }
    res.json({
        msg:"OTP sent"
    })
})

app.post("/otpValidateTeacher",async (req,res)=>{
    const {otpProvided,email}=req.body
    const correctOTP=await client.otp.findFirstOrThrow({
        where:{
            email
        },select:{
            OTP:true,
            password:true
        }
    })
    const hash=jwt.sign(correctOTP.password,JWT_SECRET)
    if(parseInt(otpProvided) === correctOTP.OTP){
        await client.teacher.update({
            where:{
                email
            },data:{
                password:hash
            }
        })
        res.json({
            msg:"Password updated successfully"
        })
        return
    }else{
        res.json({
            msg:"OTP is incorrect",
            role:"teacher"
        })
    }
})

app.post("/otpValidateStudent",async (req,res)=>{
    const {otpProvided,email}=req.body
    const correctOTP=await client.otp.findFirstOrThrow({
        where:{
            email
        },select:{
            OTP:true,
            password:true
        }
    })
    const hash=jwt.sign(correctOTP.password,JWT_SECRET)
    if(parseInt(otpProvided) === correctOTP.OTP){
        await client.student.update({
            where:{
                email
            },data:{
                password:hash
            }
        })
        res.json({
            msg:"Password updated successfully"
        })
        return
    }else{
        res.json({
            msg:"OTP is incorrect",
            role:"student"
        })
    }
})


app.post("/createDivision",async (req,res)=>{
    const {noOfStudents,department}:{
        noOfStudents:string,department:string
    }=req.body
    const departmentId=await departmentIdFetch(department)
    let totalStudents=await client.student.count({
        where:{
            departmentId:departmentId.id
        }
    })
    const noOfStudentsInt=parseInt(noOfStudents)
    console.log(noOfStudentsInt)
    let division="A"
    do{
        const studentsToUpdate = await client.student.findMany({
            where: { departmentId: departmentId.id },
            take: totalStudents>=noOfStudentsInt?noOfStudentsInt:totalStudents 
        });
        console.log(studentsToUpdate)
        const studentIds = studentsToUpdate.map(student => student.usn); 
        console.log(studentIds)
        await client.student.updateMany({
            where: { usn: { in: studentIds } },
            data: { division }
        }); 
        totalStudents-=noOfStudentsInt
        division=incrementChar(division)
        console.log(totalStudents,division," 1 iteration done")
    }while(totalStudents > 0)
    res.json({
        msg:"Divisions created successfully"
    })
})

app.get("/attendence",async (req,res) => {
    const JWT: string = req.headers.authorization?.split(" ")[1] || "";
    const resp = JSON.parse(jwt.verify(JWT, JWT_SECRET) as string)
    const teacher=await client.teacher.findFirstOrThrow({
        where:{email:resp.email}
    })
    const tid=teacher.id
    const data=await client.allocations.findMany({
        where:{
            teacherId:tid
        },select:{
            departmentId:true,
            division:true,
            subjectId:true
        }
    })
    const mapedData=data.map(async (e)=>{
        return {
            department:await client.department.findFirstOrThrow({
                where:{id:e.departmentId}
            }),
            division:e.division,
            subject:await client.subject.findFirstOrThrow({
                where:{id:e.subjectId}
            })
        }
    })

    res.json({
        teacherList:mapedData
    })
})

app.get("/attendence/:sem/:div/:subject",async (req,res) => {
    const {sem,div,subject}=req.params
    const JWT: string = req.headers.authorization?.split(" ")[1] || "";
    const resp = JSON.parse(jwt.verify(JWT, JWT_SECRET) as string)
    const subjectId=(await client.subject.findFirstOrThrow({
        where:{name:subject}
    })).id
    const data=await client.attendance.findMany({
        where:{
            subjectId,
        }
    })

    const updatedData=data.map(async (e)=>{
        return {
            usn:e.usn,
            name:await client.student.findFirstOrThrow({
                where:{usn:e.usn}
            }),
            attendence:e.attendance
        }
    })
    res.json({
        studentData:updatedData
    })
})

app.post("/attendence",async (req,res) => {
    const {subject}:{subject:string}=req.params
    const {data}:{data:[{
        username:string,usn:string,attendence:number
    }]} = req.body
    //TODO: complete this
    const subjectId=(await client.subject.findFirstOrThrow({
        where:{
            name:subject
        }
    }))

})

app.get("/departments",async (req,res)=>{
    const list=await client.department.findMany({});
    res.json({
        departmentList:list
    })
})

app.get("/studentDetails",async (req,res) => {
    const data=await client.student.findMany({})
    const mapData=data.map((e)=>{
        return {
            usn:e.usn,
            dob:e.year+"-"+(e.month<10?"0"+e.month:e.month)+"-"+(e.date<10?"0"+e.date:e.date),
            parentEmail:e.parentEmail,
            division:e.division
        }
    })
    res.json({
        studentList:mapData
    })
})

app.get("/getTeachers",async (req,res) => {
    const data=await client.teacher.findMany({})
    const dept=await client.department.findMany({})
    res.json({teacherList:data,departmentList:dept})
})

app.post("/createDepartment",async (req,res)=> {
    const {name}=req.body;
    await client.department.create({
        data:{
            name
        }
    })
    res.json({msg:"Department created successfully"})
})



app.listen(3000)    