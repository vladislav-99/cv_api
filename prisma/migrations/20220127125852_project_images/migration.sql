/*
  Warnings:

  - You are about to drop the column `photos` on the `Projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "photos";

-- CreateTable
CREATE TABLE "Project_images" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "project_id" INTEGER,

    CONSTRAINT "Project_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project_images" ADD CONSTRAINT "Project_images_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
