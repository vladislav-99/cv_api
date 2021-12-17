import { Router } from 'express';

import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controllers/experience.controller';
import checkRequired, {
  FieldAction,
  RequredFields,
} from '../middleware/checkRequired.middleware';

const router = Router();

// get all experiences
router.get('/experiences', getExperiences);

// create experience
router.post(
  '/experiences',
  checkRequired([RequredFields.name], FieldAction.create),
  createExperience,
);

// update experience
router.patch(
  '/experiences/:id',
  checkRequired([RequredFields.name], FieldAction.update),
  updateExperience,
);

// delete experience
router.delete('/experiences/:id', deleteExperience);

export default router;
