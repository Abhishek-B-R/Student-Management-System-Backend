-- CreateTable
CREATE TABLE "Student" (
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "usn" TEXT NOT NULL,
    "date" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "department" TEXT NOT NULL,
    "division" TEXT,
    "yearOfJoining" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("usn")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "noOfClassTaken" INTEGER NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("username","division")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "usn" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "attendance" INTEGER NOT NULL,
    "marks" INTEGER NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("usn","subject")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_usn_key" ON "Student"("usn");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_usn_key" ON "Attendance"("usn");

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_usn_fkey" FOREIGN KEY ("usn") REFERENCES "Student"("usn") ON DELETE RESTRICT ON UPDATE CASCADE;
