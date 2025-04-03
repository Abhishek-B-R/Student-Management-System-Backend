export type StudentProps={
    username:string,
    dob:string,
    email:string,
    password:string,
    yearOfJoining:number,
    department:string,
    parentEmail:string
}

export type TeacherProps={
    username:string,
    email:string,
    password:string,
    division:string,
    subject:string
}

export enum RoleTypes{
    teacher,student,parent
}