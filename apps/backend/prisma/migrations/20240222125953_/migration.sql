/*
  Warnings:

  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_user_id_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `user_id`;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `userId` INTEGER NOT NULL,
    `published_at` BIGINT NOT NULL,
    `created_at` BIGINT NOT NULL,
    `updated_at` BIGINT NOT NULL,

    UNIQUE INDEX `Post_published_at_key`(`published_at`),
    UNIQUE INDEX `Post_created_at_key`(`created_at`),
    UNIQUE INDEX `Post_updated_at_key`(`updated_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
