/*
  Warnings:

  - Added the required column `uuid` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `uuid` VARCHAR(1024) NOT NULL;
