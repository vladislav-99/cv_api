-- DropForeignKey
ALTER TABLE "CV" DROP CONSTRAINT "CV_user_id_fkey";

-- DropForeignKey
ALTER TABLE "CV_projects" DROP CONSTRAINT "CV_projects_cv_id_fkey";

-- DropForeignKey
ALTER TABLE "CV_projects" DROP CONSTRAINT "CV_projects_project_id_fkey";

-- DropForeignKey
ALTER TABLE "Project_technologies" DROP CONSTRAINT "Project_technologies_project_id_fkey";

-- DropForeignKey
ALTER TABLE "Project_technologies" DROP CONSTRAINT "Project_technologies_technology_id_fkey";

-- DropForeignKey
ALTER TABLE "User_education" DROP CONSTRAINT "User_education_education_id_fkey";

-- DropForeignKey
ALTER TABLE "User_education" DROP CONSTRAINT "User_education_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User_technologies" DROP CONSTRAINT "User_technologies_technology_id_fkey";

-- DropForeignKey
ALTER TABLE "User_technologies" DROP CONSTRAINT "User_technologies_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User_work_experience" DROP CONSTRAINT "User_work_experience_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User_work_experience" DROP CONSTRAINT "User_work_experience_work_experience_id_fkey";

-- AddForeignKey
ALTER TABLE "CV" ADD CONSTRAINT "CV_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_technologies" ADD CONSTRAINT "User_technologies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_technologies" ADD CONSTRAINT "User_technologies_technology_id_fkey" FOREIGN KEY ("technology_id") REFERENCES "Technologies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_technologies" ADD CONSTRAINT "Project_technologies_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_technologies" ADD CONSTRAINT "Project_technologies_technology_id_fkey" FOREIGN KEY ("technology_id") REFERENCES "Technologies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CV_projects" ADD CONSTRAINT "CV_projects_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "CV"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CV_projects" ADD CONSTRAINT "CV_projects_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_work_experience" ADD CONSTRAINT "User_work_experience_work_experience_id_fkey" FOREIGN KEY ("work_experience_id") REFERENCES "Work_experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_work_experience" ADD CONSTRAINT "User_work_experience_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_education" ADD CONSTRAINT "User_education_education_id_fkey" FOREIGN KEY ("education_id") REFERENCES "Education"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_education" ADD CONSTRAINT "User_education_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
