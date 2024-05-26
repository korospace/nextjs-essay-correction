/*
  Warnings:

  - You are about to alter the column `created_by` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to alter the column `updated_by` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - Added the required column `full_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Made the column `deleted_by` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `full_name` VARCHAR(255) NOT NULL,
    MODIFY `created_by` INTEGER NOT NULL DEFAULT 0,
    MODIFY `updated_by` INTEGER NOT NULL DEFAULT 0,
    MODIFY `deleted_by` INTEGER NOT NULL DEFAULT 0;
