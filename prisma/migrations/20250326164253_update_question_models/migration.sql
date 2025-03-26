/*
  Warnings:

  - You are about to drop the column `correctAnswer` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `explanation` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `popularity` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "correctAnswer",
DROP COLUMN "explanation",
DROP COLUMN "options",
DROP COLUMN "popularity",
ADD COLUMN     "topic" TEXT;

-- CreateTable
CREATE TABLE "MCQData" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "distractorAnalysis" TEXT,

    CONSTRAINT "MCQData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShortAnswerData" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "sampleAnswer" TEXT NOT NULL,
    "keywords" TEXT[],
    "explanation" TEXT NOT NULL,

    CONSTRAINT "ShortAnswerData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LongAnswerData" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "rubric" JSONB NOT NULL,
    "sampleAnswer" TEXT NOT NULL,
    "keyPoints" TEXT[],

    CONSTRAINT "LongAnswerData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MCQData_questionId_key" ON "MCQData"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "ShortAnswerData_questionId_key" ON "ShortAnswerData"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "LongAnswerData_questionId_key" ON "LongAnswerData"("questionId");

-- CreateIndex
CREATE INDEX "Question_type_idx" ON "Question"("type");

-- AddForeignKey
ALTER TABLE "MCQData" ADD CONSTRAINT "MCQData_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortAnswerData" ADD CONSTRAINT "ShortAnswerData_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LongAnswerData" ADD CONSTRAINT "LongAnswerData_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
