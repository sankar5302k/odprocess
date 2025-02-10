/*
  Warnings:

  - You are about to drop the column `HODNAME` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hodName]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_HODNAME_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "HODNAME",
DROP COLUMN "Password",
ADD COLUMN     "hodName" TEXT NOT NULL DEFAULT 'default_hod',
ADD COLUMN     "password" TEXT NOT NULL DEFAULT 'default_password';

-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "studentName" TEXT NOT NULL,
    "sitId" TEXT NOT NULL,
    "initialOd" INTEGER NOT NULL DEFAULT 0,
    "hodName" TEXT NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Students_sitId_key" ON "Students"("sitId");

-- CreateIndex
CREATE UNIQUE INDEX "User_hodName_key" ON "User"("hodName");
