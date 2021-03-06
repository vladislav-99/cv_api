import { Express } from 'express';
import userRouter from './user.routes';
import technologyRouter from './technology.routes';
import projectRouter from './project.routes';
import experienceRouter from './experience.routes';
import educationRouter from './education.routes';
import imageRouter from './image.routes';

export default function connectRouter(app: Express) {
  app.use('/api', userRouter);
  app.use('/api', technologyRouter);
  app.use('/api', projectRouter);
  app.use('/api', experienceRouter);
  app.use('/api', educationRouter);
  app.use('/api', imageRouter);
}
