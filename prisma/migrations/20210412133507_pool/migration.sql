/*
  Warnings:

  - You are about to drop the column `status` on the `Pool` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Pool` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Pool` DROP COLUMN `status`,
    ADD COLUMN     `poolStatus` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `Pool.slug_unique` ON `Pool`(`slug`);
