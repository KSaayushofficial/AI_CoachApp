/*
  Warnings:

  - Added the required column `subtopic` to the `GeneratedQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GeneratedQuestion" ADD COLUMN     "subtopic" TEXT NOT NULL;
