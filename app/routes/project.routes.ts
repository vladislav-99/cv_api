import { Router } from 'express';

import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectById,
} from '../controllers/project.controller';

import checkRequired, {
  FieldAction,
  RequredFields,
} from '../middleware/checkRequired.middleware';

const router = Router();

// get all projects
router.get('/projects', getAllProjects);

router.get('/projects/:id', getProjectById);

// create project
router.post(
  '/projects',
  checkRequired(
    [RequredFields.name, RequredFields.projectType],
    FieldAction.create,
  ),
  createProject,
);

// update project
router.patch(
  '/projects/:id',
  checkRequired(
    [RequredFields.name, RequredFields.projectType],
    FieldAction.update,
  ),
  updateProject,
);

// delete project
router.delete('/projects/:id', deleteProject);

export default router;
