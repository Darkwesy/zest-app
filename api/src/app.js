import Express, { urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { userRouter } from './router/userRoutes.js';
import { eventRouter } from './router/eventsRoutes.js';

export const app = Express();

app.use(cors({ origin: 'http://192.168.0.100:5173' }));
app.use(morgan('dev'));
app.use(Express.json());
app.use(urlencoded({ extended: true }));

app.use('/', userRouter);
app.use('/', eventRouter);

app.get('/', (request, response) => {
  response.status(200).json({
    httpCode: '200',
    mesage: 'Hello World!',
  });
});
