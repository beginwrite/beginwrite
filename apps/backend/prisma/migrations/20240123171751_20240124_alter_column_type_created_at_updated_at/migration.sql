/*
  Warnings:

  - A unique constraint covering the columns `[created_at]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[updated_at]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `created_at` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `updated_at` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `created_at`,
    ADD COLUMN `created_at` INTEGER NOT NULL,
    DROP COLUMN `updated_at`,
    ADD COLUMN `updated_at` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_created_at_key` ON `User`(`created_at`);

-- CreateIndex
CREATE UNIQUE INDEX `User_updated_at_key` ON `User`(`updated_at`);
