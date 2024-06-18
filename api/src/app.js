import Express, { urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { userRouter } from './router/userRoutes.js';
import { eventRouter } from './router/eventsRoutes.js';
import { categoriesRouter } from './router/categoriesRoutes.js';

export const app = Express();

app.use(cors());
app.use(morgan('dev'));
app.use(Express.json());
app.use(urlencoded({ extended: true }));

app.use('/', userRouter);
app.use('/', eventRouter);
app.use('/', categoriesRouter);

app.get('/', (request, response) => {
  response.status(200).json({
    httpCode: '200',
    message: 'Hello World!',
  });
});
