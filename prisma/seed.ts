import { PrismaClient } from '@prisma/client';
const client = new PrismaClient();

async function main() {
    // // Create Departments
    // await client.department.createMany({
    //     data: [
    //         { name: "CS" },
    //         { name: "EC" },
    //         { name: "EE" },
    //         { name: "ME" },
    //         { name: "CV" }
    //     ],
    //     skipDuplicates: true,
    // });

    // console.log('Departments created!');

    // // Create Subjects
    // await client.subject.createMany({
    //     data: [
    //   { "id": 1, "name": "Mathematics", "sem": 1 },
    //   { "id": 2, "name": "Physics", "sem": 1 },
    //   { "id": 3, "name": "Chemistry", "sem": 1 },
    //   { "id": 4, "name": "Computer Science", "sem": 2 },
    //   { "id": 5, "name": "Electrical Circuits", "sem": 2 },
    //   { "id": 6, "name": "Mechanics", "sem": 3 },
    //   { "id": 7, "name": "Data Structures", "sem": 3 },
    //   { "id": 8, "name": "Operating Systems", "sem": 4 },
    //   { "id": 9, "name": "Database Management", "sem": 4 },
    //   { "id": 10, "name": "Artificial Intelligence", "sem": 5 }
    // ],
    //     skipDuplicates: true,
    // });

    // console.log('Subjects created!');

    // Create Students
    // await client.student.createMany({
    //     data:[
    //         {
    //           "username": "john_doe",
    //           "email": "john.doe@example.com",
    //           "parentEmail": "parent.doe@example.com",
    //           "password": "hashed_password",
    //           "usn": "20BCS001",
    //           "date": 12,
    //           "month": 5,
    //           "year": 2002,
    //           "departmentId": 1,
    //           "yearOfJoining": 2020
    //         },
    //         {
    //           "username": "jane_smith",
    //           "email": "jane.smith@example.com",
    //           "parentEmail": "parent.smith@example.com",
    //           "password": "hashed_password",
    //           "usn": "21BME001",
    //           "date": 8,
    //           "month": 10,
    //           "year": 2003,
    //           "departmentId": 2,
    //           "yearOfJoining": 2021
    //         },
    //         {
    //           "username": "mike_jordan",
    //           "email": "mike.jordan@example.com",
    //           "parentEmail": "parent.jordan@example.com",
    //           "password": "hashed_password",
    //           "usn": "19BEE001",
    //           "date": 5,
    //           "month": 3,
    //           "year": 2001,
    //           "departmentId": 3,
    //           "yearOfJoining": 2019
    //         },
    //         {
    //           "username": "emily_watson",
    //           "email": "emily.watson@example.com",
    //           "parentEmail": "parent.watson@example.com",
    //           "password": "hashed_password",
    //           "usn": "20BCS002",
    //           "date": 20,
    //           "month": 7,
    //           "year": 2002,
    //           "departmentId": 1,
    //           "yearOfJoining": 2020
    //         },
    //         {
    //           "username": "david_miller",
    //           "email": "david.miller@example.com",
    //           "parentEmail": "parent.miller@example.com",
    //           "password": "hashed_password",
    //           "usn": "18BME001",
    //           "date": 30,
    //           "month": 11,
    //           "year": 2000,
    //           "departmentId": 2,
    //           "yearOfJoining": 2018
    //         },
    //         {
    //           "username": "lisa_adams",
    //           "email": "lisa.adams@example.com",
    //           "parentEmail": "parent.adams@example.com",
    //           "password": "hashed_password",
    //           "usn": "19BEE002",
    //           "date": 15,
    //           "month": 9,
    //           "year": 2001,
    //           "departmentId": 3,
    //           "yearOfJoining": 2019
    //         },
    //         {
    //           "username": "robert_clark",
    //           "email": "robert.clark@example.com",
    //           "parentEmail": "parent.clark@example.com",
    //           "password": "hashed_password",
    //           "usn": "21BCS001",
    //           "date": 22,
    //           "month": 6,
    //           "year": 2003,
    //           "departmentId": 1,
    //           "yearOfJoining": 2021
    //         },
    //         {
    //           "username": "sophia_hall",
    //           "email": "sophia.hall@example.com",
    //           "parentEmail": "parent.hall@example.com",
    //           "password": "hashed_password",
    //           "usn": "22BME001",
    //           "date": 11,
    //           "month": 2,
    //           "year": 2004,
    //           "departmentId": 2,
    //           "yearOfJoining": 2022
    //         },
    //         {
    //           "username": "jason_lee",
    //           "email": "jason.lee@example.com",
    //           "parentEmail": "parent.lee@example.com",
    //           "password": "hashed_password",
    //           "usn": "18BEE001",
    //           "date": 17,
    //           "month": 12,
    //           "year": 2000,
    //           "departmentId": 3,
    //           "yearOfJoining": 2018
    //         },
    //         {
    //           "username": "olivia_moore",
    //           "email": "olivia.moore@example.com",
    //           "parentEmail": "parent.moore@example.com",
    //           "password": "hashed_password",
    //           "usn": "20BCS003",
    //           "date": 25,
    //           "month": 8,
    //           "year": 2002,
    //           "departmentId": 1,
    //           "yearOfJoining": 2020
    //         }
    //       ],
    //     skipDuplicates: true,
    // });

    // console.log('Students created!');

    // Create Teachers
    // const teachers = await client.teacher.createMany({
    //     data: [
    //         {
    //           "id": 1,
    //           "username": "alice_watson",
    //           "email": "alice.watson@example.com",
    //           "password": "hashed_password"
    //         },
    //         {
    //           "id": 2,
    //           "username": "bob_davis",
    //           "email": "bob.davis@example.com",
    //           "password": "hashed_password"
    //         },
    //         {
    //           "id": 3,
    //           "username": "charlie_brown",
    //           "email": "charlie.brown@example.com",
    //           "password": "hashed_password"
    //         },
    //         {
    //           "id": 4,
    //           "username": "diana_clark",
    //           "email": "diana.clark@example.com",
    //           "password": "hashed_password"
    //         },
    //         {
    //           "id": 5,
    //           "username": "edward_thompson",
    //           "email": "edward.thompson@example.com",
    //           "password": "hashed_password"
    //         },
    //         {
    //           "id": 6,
    //           "username": "fiona_white",
    //           "email": "fiona.white@example.com",
    //           "password": "hashed_password"
    //         },
    //         {
    //           "id": 7,
    //           "username": "george_harris",
    //           "email": "george.harris@example.com",
    //           "password": "hashed_password"
    //         },
    //         {
    //           "id": 8,
    //           "username": "hannah_martin",
    //           "email": "hannah.martin@example.com",
    //           "password": "hashed_password"
    //         },
    //         {
    //           "id": 9,
    //           "username": "ian_roberts",
    //           "email": "ian.roberts@example.com",
    //           "password": "hashed_password"
    //         },
    //         {
    //           "id": 10,
    //           "username": "jessica_patel",
    //           "email": "jessica.patel@example.com",
    //           "password": "hashed_password"
    //         },
    //         {
    //           "id": 11,
    //           "username": "kevin_garcia",
    //           "email": "kevin.garcia@example.com",
    //           "password": "hashed_password"
    //         },
    //         {
    //           "id": 12,
    //           "username": "laura_hernandez",
    //           "email": "laura.hernandez@example.com",
    //           "password": "hashed_password"
    //         },
    //         {
    //           "id": 13,
    //           "username": "michael_lopez",
    //           "email": "michael.lopez@example.com",
    //           "password": "hashed_password"
    //         },
    //         {
    //           "id": 14,
    //           "username": "natalie_wilson",
    //           "email": "natalie.wilson@example.com",
    //           "password": "hashed_password"
    //         },
    //         {
    //           "id": 15,
    //           "username": "oliver_scott",
    //           "email": "oliver.scott@example.com",
    //           "password": "hashed_password"
    //         },
    //         {
    //           "id": 16,
    //           "username": "paula_green",
    //           "email": "paula.green@example.com",
    //           "password": "hashed_password"
    //         },
    //         {
    //           "id": 17,
    //           "username": "quentin_king",
    //           "email": "quentin.king@example.com",
    //           "password": "hashed_password"
    //         },
    //         {
    //           "id": 18,
    //           "username": "rachel_adams",
    //           "email": "rachel.adams@example.com",
    //           "password": "hashed_password"
    //         },
    //         {
    //           "id": 19,
    //           "username": "steven_baker",
    //           "email": "steven.baker@example.com",
    //           "password": "hashed_password"
    //         },
    //         {
    //           "id": 20,
    //           "username": "tina_mitchell",
    //           "email": "tina.mitchell@example.com",
    //           "password": "hashed_password"
    //         }
    //       ],
    //     skipDuplicates: true,
    // });

    // console.log('Teachers created!');

    // // Create Allocations (Linking Teachers, Departments, Subjects and Divisions)
//     await client.allocations.createMany({
//         data: [
//   {
//     "teacherId": 1,
//     "departmentId": 1,
//     "subjectId": 1,
//     "division": "A",
//     "noOfClassTaken": 25
//   },
//   {
//     "teacherId": 2,
//     "departmentId": 2,
//     "subjectId": 3,
//     "division": "B",
//     "noOfClassTaken": 30
//   },
//   {
//     "teacherId": 3,
//     "departmentId": 3,
//     "subjectId": 5,
//     "division": "C",
//     "noOfClassTaken": 18
//   },
//   {
//     "teacherId": 4,
//     "departmentId": 1,
//     "subjectId": 2,
//     "division": "A",
//     "noOfClassTaken": 40
//   },
//   {
//     "teacherId": 5,
//     "departmentId": 4,
//     "subjectId": 7,
//     "division": "B",
//     "noOfClassTaken": 35
//   },
//   {
//     "teacherId": 6,
//     "departmentId": 2,
//     "subjectId": 6,
//     "division": "C",
//     "noOfClassTaken": 28
//   },
//   {
//     "teacherId": 7,
//     "departmentId": 3,
//     "subjectId": 4,
//     "division": "A",
//     "noOfClassTaken": 20
//   },
//   {
//     "teacherId": 8,
//     "departmentId": 5,
//     "subjectId": 8,
//     "division": "B",
//     "noOfClassTaken": 45
//   },
//   {
//     "teacherId": 9,
//     "departmentId": 1,
//     "subjectId": 9,
//     "division": "C",
//     "noOfClassTaken": 12
//   },
//   {
//     "teacherId": 10,
//     "departmentId": 2,
//     "subjectId": 10,
//     "division": "A",
//     "noOfClassTaken": 38
//   },
//   {
//     "teacherId": 11,
//     "departmentId": 3,
//     "subjectId": 1,
//     "division": "B",
//     "noOfClassTaken": 29
//   },
//   {
//     "teacherId": 12,
//     "departmentId": 4,
//     "subjectId": 3,
//     "division": "C",
//     "noOfClassTaken": 41
//   },
//   {
//     "teacherId": 13,
//     "departmentId": 5,
//     "subjectId": 5,
//     "division": "A",
//     "noOfClassTaken": 27
//   },
//   {
//     "teacherId": 14,
//     "departmentId": 1,
//     "subjectId": 7,
//     "division": "B",
//     "noOfClassTaken": 36
//   },
//   {
//     "teacherId": 15,
//     "departmentId": 2,
//     "subjectId": 9,
//     "division": "C",
//     "noOfClassTaken": 22
//   },
//   {
//     "teacherId": 16,
//     "departmentId": 3,
//     "subjectId": 2,
//     "division": "A",
//     "noOfClassTaken": 48
//   },
//   {
//     "teacherId": 17,
//     "departmentId": 4,
//     "subjectId": 4,
//     "division": "B",
//     "noOfClassTaken": 37
//   },
//   {
//     "teacherId": 18,
//     "departmentId": 5,
//     "subjectId": 6,
//     "division": "C",
//     "noOfClassTaken": 26
//   },
//   {
//     "teacherId": 19,
//     "departmentId": 1,
//     "subjectId": 8,
//     "division": "A",
//     "noOfClassTaken": 19
//   },
//   {
//     "teacherId": 20,
//     "departmentId": 2,
//     "subjectId": 10,
//     "division": "B",
//     "noOfClassTaken": 32
//   }
// ],
//         skipDuplicates: true,
//     });

//     console.log('Allocations created!');

    // Create Attendance Records
    // await client.attendance.createMany({
    //     data:[
    //   { "usn": "20CS001", "subjectId": 1, "attendance": 85, "marks": 90 },
    //   { "usn": "20CS002", "subjectId": 2, "attendance": 78, "marks": 87 },
    //   { "usn": "20CS003", "subjectId": 3, "attendance": 92, "marks": 89 },
    //   { "usn": "21ME001", "subjectId": 4, "attendance": 75, "marks": 76 },
    //   { "usn": "21ME002", "subjectId": 5, "attendance": 80, "marks": 81 },
    //   { "usn": "19EE001", "subjectId": 6, "attendance": 88, "marks": 85 },
    //   { "usn": "19EE002", "subjectId": 7, "attendance": 90, "marks": 88 },
    //   { "usn": "22CS001", "subjectId": 8, "attendance": 95, "marks": 92 },
    //   { "usn": "22CS002", "subjectId": 9, "attendance": 70, "marks": 72 },
    //   { "usn": "18ME001", "subjectId": 10, "attendance": 60, "marks": 65 },
    //   { "usn": "18ME002", "subjectId": 1, "attendance": 83, "marks": 79 },
    //   { "usn": "20CS004", "subjectId": 2, "attendance": 90, "marks": 95 },
    //   { "usn": "21ME003", "subjectId": 3, "attendance": 88, "marks": 86 },
    //   { "usn": "19EE003", "subjectId": 4, "attendance": 72, "marks": 75 },
    //   { "usn": "22CS003", "subjectId": 5, "attendance": 97, "marks": 98 },
    //   { "usn": "22ME001", "subjectId": 6, "attendance": 80, "marks": 82 },
    //   { "usn": "18EE001", "subjectId": 7, "attendance": 85, "marks": 87 },
    //   { "usn": "18EE002", "subjectId": 8, "attendance": 92, "marks": 94 },
    //   { "usn": "20CS005", "subjectId": 9, "attendance": 76, "marks": 78 },
    //   { "usn": "21CS001", "subjectId": 10, "attendance": 88, "marks": 90 }
    // ],
    //     skipDuplicates: true,
    // });

    // console.log('Attendance records created!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });
