/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `Pool` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191),
    `status` ENUM('DRAFT', 'OPEN_TO_VOTE', 'FINISHED') NOT NULL DEFAULT 'DRAFT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PoolOption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `poolId` INTEGER NOT NULL,
    `image` VARCHAR(191),
    `label` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191),
    `votes` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PoolAnswer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `poolId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `poolOptionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User.email_unique` ON `User`(`email`);

-- AddForeignKey
ALTER TABLE `PoolOption` ADD FOREIGN KEY (`poolId`) REFERENCES `Pool`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PoolAnswer` ADD FOREIGN KEY (`poolId`) REFERENCES `Pool`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
