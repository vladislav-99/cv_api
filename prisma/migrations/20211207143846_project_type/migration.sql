/*
  Warnings:

  - Made the column `type` on table `Projects` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Projects" ALTER COLUMN "type" SET NOT NULL;
