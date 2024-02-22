/*
  Warnings:

  - You are about to drop the `user_profile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bio` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `display_name` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `bio` TEXT NOT NULL,
    ADD COLUMN `display_name` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `user_profile`;
