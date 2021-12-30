import { Router } from 'express';

import {
  getEducations,
  createEducation,
  createEducations,
  updateEducation,
  deleteEducation,
} from '../controllers/education.controller';

import checkRequired, {
  FieldAction,
  RequredFields,
} from '../middleware/checkRequired.middleware';

const router = Router();

// get all educations
router.get('/educations', getEducations);

// create education
router.post(
  '/educations',
  checkRequired([RequredFields.name], FieldAction.create),
  createEducation,
);

// create several educations
router.post(
  '/educations/add-many',
  checkRequired([RequredFields.educations]),
  createEducations,
);

// update education
router.patch(
  '/educations/:id',
  checkRequired([RequredFields.name], FieldAction.update),
  updateEducation,
);

// delete education
router.delete('/educations/:id', deleteEducation);

export default router;
