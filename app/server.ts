import 'reflect-metadata';
import express, { Request, Response } from 'express';
import cors from 'cors';
import formidable from 'express-formidable';
import connectRouter from './routes';
import errorMiddleware from './middleware/error.middleware';

const app = express();

app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());
app.use(formidable());
app.get('/', async (req: Request, res: Response) => {
  res.json({ message: 'Welcome to leviossa_cv API' });
});

connectRouter(app);

app.use(errorMiddleware);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Server started on port', PORT));
