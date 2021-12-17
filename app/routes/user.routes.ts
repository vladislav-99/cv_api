import { Router } from 'express';

import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/user.controller';
import checkRequired, {
  FieldAction,
  RequredFields,
} from '../middleware/checkRequired.middleware';

const router = Router();

// get all users
router.get('/users', getAllUsers);

// get user by id
router.get('/users/:id', getUser);

// create user
router.post(
  '/users',
  checkRequired([RequredFields.name], FieldAction.create),
  createUser,
);

// update user
router.patch(
  '/users/:id',
  checkRequired([RequredFields.name], FieldAction.update),
  updateUser,
);

// delete user
router.delete('/users/:id', deleteUser);

export default router;
