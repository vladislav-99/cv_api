-- CreateIndex
CREATE INDEX "CV_user_id_idx" ON "CV"("user_id");

-- CreateIndex
CREATE INDEX "CV_projects_project_id_cv_id_idx" ON "CV_projects"("project_id", "cv_id");

-- CreateIndex
CREATE INDEX "Project_technologies_project_id_technology_id_idx" ON "Project_technologies"("project_id", "technology_id");

-- CreateIndex
CREATE INDEX "User_education_user_id_idx" ON "User_education"("user_id");

-- CreateIndex
CREATE INDEX "User_technologies_user_id_technology_id_idx" ON "User_technologies"("user_id", "technology_id");

-- CreateIndex
CREATE INDEX "User_work_experience_user_id_work_experience_id_idx" ON "User_work_experience"("user_id", "work_experience_id");
