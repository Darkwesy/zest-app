/*
  Warnings:

  - You are about to drop the column `organizer_id` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `user_event` table. All the data in the column will be lost.
  - You are about to drop the `check_in` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `organizer_email` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `user_event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `check_in` DROP FOREIGN KEY `check_in_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `check_in` DROP FOREIGN KEY `check_in_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `event_organizer_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_event` DROP FOREIGN KEY `user_event_user_id_fkey`;

-- DropIndex
DROP INDEX `user_event_user_id_event_id_key` ON `user_event`;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `organizer_id`,
    ADD COLUMN `organizer_email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user_event` DROP COLUMN `user_id`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `check_in`;
