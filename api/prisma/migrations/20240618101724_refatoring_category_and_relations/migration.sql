/*
  Warnings:

  - You are about to drop the `user_event` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_id` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_link` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user_event` DROP FOREIGN KEY `user_event_event_id_fkey`;

-- AlterTable
ALTER TABLE `event` ADD COLUMN `category_id` INTEGER NOT NULL,
    ADD COLUMN `event_link` VARCHAR(191) NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NULL,
    ADD COLUMN `maxParticipants` INTEGER NULL;

-- DropTable
DROP TABLE `user_event`;

-- CreateTable
CREATE TABLE `category` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `category_category_id_key`(`category_id`),
    UNIQUE INDEX `category_name_key`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
