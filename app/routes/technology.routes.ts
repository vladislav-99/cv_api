import { Router } from "express";

import {
  getTechnologies,
  createTechnology,
  updateTechnology,
  deleteTechnology,
} from "../controllers/technology.controller";

const router = Router();

// get all technologies
router.get("/technologies", getTechnologies);

// create technology
router.post("/technologies", createTechnology);

// update technology
router.put("/technologies/:id", updateTechnology);

// delete technology
router.delete("/technologies/:id", deleteTechnology);

export default router;
