/*
  Warnings:

  - You are about to drop the column `division` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Attendance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "division",
DROP COLUMN "username";
