import { PrismaClient } from "@prisma/client"
const client=new PrismaClient()
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export async function departmentIdFetch(department:string){
    return await client.department.findFirstOrThrow({
        where:{name:department},select:{id:true}
    })
}

export async function subjectIdFetch(subject:string) {
    return await client.subject.findFirstOrThrow({
        where:{name:subject},select:{id:true}
    })
}

export const generateOTP = (length = 6) => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
};
  

export const sendOTPEmail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.email,
      pass: process.env.password
    }
  });

  const templatePath = path.join(__dirname.split("/").filter(e=>e!=="dist").join("/"), 'EmailOtpTemplate.html');
  let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');
  htmlTemplate = htmlTemplate.replace('{{OTP}}', otp);

  const mailOptions = {
    from: process.env.email,
    to: email,
    subject: 'Your OTP Code',
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
  console.log('OTP sent to', email);
};

export function incrementChar(char: string): string {
  if (char === 'Z') return 'A';
  return String.fromCharCode(char.charCodeAt(0) + 1);
}
