/*
  Warnings:

  - You are about to drop the `ProspectForInterview` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `ProspectForInterview`;

-- CreateTable
CREATE TABLE `InterviewProspect` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(300) NOT NULL,
    `fieldArea` VARCHAR(191) NOT NULL,
    `message` TEXT,
    `email` VARCHAR(255),
    `whatsapp` VARCHAR(20),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
