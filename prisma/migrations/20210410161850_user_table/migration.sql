-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191),
    `city` VARCHAR(191),
    `country` VARCHAR(191),
    `birthday` DATETIME(3),
    `thumbnail` VARCHAR(191),
    `facebookId` VARCHAR(191),
    `googleId` VARCHAR(191),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
