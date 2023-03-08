/*
  Warnings:

  - You are about to drop the column `oberservation` on the `schedulings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `schedulings` DROP COLUMN `oberservation`,
    ADD COLUMN `observation` VARCHAR(191) NULL;
