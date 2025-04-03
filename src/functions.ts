import { PrismaClient } from "@prisma/client"
const client=new PrismaClient()

export async function departmentIdFetch(department:string){
    return await client.department.findFirst({
        where:{name:department},select:{id:true}
    })
}

export async function subjectIdFetch(subject:string) {
    return await client.subject.findFirst({
        where:{name:subject},select:{id:true}
    })
}