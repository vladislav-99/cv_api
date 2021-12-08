import { Router } from "express";

import {
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experience.controller";

const router = Router();

// get all experiences
router.get("/experiences", getAllExperiences);

// create experience
router.post("/experiences", createExperience);

// update experience
router.put("/experiences/:id", updateExperience);

// delete experience
router.delete("/experiences/:id", deleteExperience);

export default router;
