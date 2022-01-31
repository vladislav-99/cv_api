import { Router } from 'express';
import {
  createImage,
  deleteImage,
  deleteImages
} from '../controllers/image.controller';

const router = Router();

router.post('/project-images', createImage);

router.delete('/project-images/:id', deleteImage);

router.delete('/project-images/', deleteImages);

export default router;