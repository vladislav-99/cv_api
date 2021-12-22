import 'reflect-metadata';
import express, { Request, Response } from 'express';
import cors from 'cors';
import connectRouter from './app/routes';
import errorMiddleware from './app/middleware/error.middleware';

const app = express();

app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Welcome to leviossa_cv API' });
});

connectRouter(app);

app.use(errorMiddleware);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Server started on port', PORT));
