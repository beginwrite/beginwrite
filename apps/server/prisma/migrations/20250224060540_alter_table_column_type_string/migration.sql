-- DropIndex
DROP INDEX `user_created_at_key` ON `user`;

-- DropIndex
DROP INDEX `user_updated_at_key` ON `user`;

-- AlterTable
ALTER TABLE `post` MODIFY `published_at` VARCHAR(191) NULL,
    MODIFY `created_at` VARCHAR(191) NOT NULL,
    MODIFY `updated_at` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `created_at` VARCHAR(191) NOT NULL,
    MODIFY `updated_at` VARCHAR(191) NOT NULL;
