/*
  Warnings:

  - You are about to alter the column `score` on the `exam_member` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `exam_member` MODIFY `score` DOUBLE NULL;
