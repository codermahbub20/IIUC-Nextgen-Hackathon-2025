import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';

const app: Application = express();

app.use(
  cors({
    origin: 'https://kmg-task-manager-front-end.vercel.app', 
    credentials: true, 
  }),
);

app.use(express.json());
app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
  res.send('CareerPath Ai Job Portal!');
});
app.use(globalErrorHandler);

export default app;