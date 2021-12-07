-- CreateEnum
CREATE TYPE "ProjectTypes" AS ENUM ('WEB_SERVICE', 'WEB_SITE', 'CRM');

-- CreateEnum
CREATE TYPE "TechnologyTypes" AS ENUM ('FRONT_END', 'BACK_END', 'DB', 'HOSTING', 'SOFT', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "photo" TEXT,
    "sphere" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT,
    "type" "ProjectTypes",
    "photos" TEXT[],
    "country" TEXT,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Technologies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TechnologyTypes" NOT NULL,

    CONSTRAINT "Technologies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CV" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "pdf" TEXT,

    CONSTRAINT "CV_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Work_experience" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Work_experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_technologies" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "technology_id" INTEGER NOT NULL,

    CONSTRAINT "User_technologies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project_technologies" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "technology_id" INTEGER NOT NULL,

    CONSTRAINT "Project_technologies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CV_projects" (
    "id" SERIAL NOT NULL,
    "cv_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "description" TEXT,
    "position" TEXT,

    CONSTRAINT "CV_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_work_experience" (
    "id" SERIAL NOT NULL,
    "work_experience_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "description" TEXT,
    "position" TEXT,

    CONSTRAINT "User_work_experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_education" (
    "id" SERIAL NOT NULL,
    "education_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "department" TEXT,

    CONSTRAINT "User_education_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Technologies_name_type_key" ON "Technologies"("name", "type");

-- CreateIndex
CREATE INDEX "CV_user_id_idx" ON "CV"("user_id");

-- CreateIndex
CREATE INDEX "User_technologies_user_id_technology_id_idx" ON "User_technologies"("user_id", "technology_id");

-- CreateIndex
CREATE INDEX "Project_technologies_project_id_technology_id_idx" ON "Project_technologies"("project_id", "technology_id");

-- CreateIndex
CREATE INDEX "CV_projects_project_id_cv_id_idx" ON "CV_projects"("project_id", "cv_id");

-- CreateIndex
CREATE INDEX "User_work_experience_user_id_work_experience_id_idx" ON "User_work_experience"("user_id", "work_experience_id");

-- CreateIndex
CREATE INDEX "User_education_user_id_idx" ON "User_education"("user_id");

-- AddForeignKey
ALTER TABLE "CV" ADD CONSTRAINT "CV_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_technologies" ADD CONSTRAINT "User_technologies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_technologies" ADD CONSTRAINT "User_technologies_technology_id_fkey" FOREIGN KEY ("technology_id") REFERENCES "Technologies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_technologies" ADD CONSTRAINT "Project_technologies_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_technologies" ADD CONSTRAINT "Project_technologies_technology_id_fkey" FOREIGN KEY ("technology_id") REFERENCES "Technologies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CV_projects" ADD CONSTRAINT "CV_projects_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "CV"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CV_projects" ADD CONSTRAINT "CV_projects_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_work_experience" ADD CONSTRAINT "User_work_experience_work_experience_id_fkey" FOREIGN KEY ("work_experience_id") REFERENCES "Work_experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_work_experience" ADD CONSTRAINT "User_work_experience_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_education" ADD CONSTRAINT "User_education_education_id_fkey" FOREIGN KEY ("education_id") REFERENCES "Education"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_education" ADD CONSTRAINT "User_education_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
