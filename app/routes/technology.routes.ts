import { Router } from 'express';

import {
  getTechnologies,
  createTechnology,
  updateTechnology,
  deleteTechnology,
  createTechnologies,
} from '../controllers/technology.controller';
import checkRequired, {
  FieldAction,
  RequredFields,
} from '../middleware/checkRequired.middleware';

const router = Router();

// get all technologies
router.get('/technologies', getTechnologies);

// create technology
router.post(
  '/technologies',
  checkRequired(
    [RequredFields.name, RequredFields.technologyType],
    FieldAction.create,
  ),
  createTechnology,
);


// create technologies
router.post(
  '/technologies/add-many',
  checkRequired(
    [RequredFields.technologies],
  ),
  createTechnologies
);

// update technology
router.patch(
  '/technologies/:id',
  checkRequired(
    [RequredFields.name, RequredFields.technologyType],
    FieldAction.update,
  ),
  updateTechnology,
);

// delete technology
router.delete('/technologies/:id', deleteTechnology);

export default router;
