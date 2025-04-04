/*
  Warnings:

  - The primary key for the `Teacher` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `division` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `noOfClassTaken` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `Teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_pkey",
DROP COLUMN "division",
DROP COLUMN "noOfClassTaken",
DROP COLUMN "subjectId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Allocations" (
    "teacherId" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "division" TEXT NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "noOfClassTaken" INTEGER NOT NULL,

    CONSTRAINT "Allocations_pkey" PRIMARY KEY ("teacherId","departmentId","division","subjectId")
);

-- AddForeignKey
ALTER TABLE "Allocations" ADD CONSTRAINT "Allocations_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allocations" ADD CONSTRAINT "Allocations_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
