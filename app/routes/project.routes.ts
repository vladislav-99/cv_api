import { Router } from "express";

import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectById,
} from "../controllers/project.controller";

const router = Router();

// get all projects
router.get("/projects", getAllProjects);

router.get("/projects/:id", getProjectById);

// create project
router.post("/projects", createProject);

// update project
router.put("/projects/:id", updateProject);

// delete project
router.delete("/projects/:id", deleteProject);

export default router;
