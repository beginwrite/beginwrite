/*
  Warnings:

  - Added the required column `uuid` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `uuid` VARCHAR(1024) NOT NULL;
