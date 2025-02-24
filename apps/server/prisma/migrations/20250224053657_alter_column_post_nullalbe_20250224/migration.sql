/*
  Warnings:

  - A unique constraint covering the columns `[created_at]` on the table `post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[updated_at]` on the table `post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `post` MODIFY `published_at` BIGINT NULL,
    MODIFY `updated_at` BIGINT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `post_created_at_key` ON `post`(`created_at`);

-- CreateIndex
CREATE UNIQUE INDEX `post_updated_at_key` ON `post`(`updated_at`);
