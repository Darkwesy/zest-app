import Express from 'express';
import { registerValidation } from '../middleware/registerValidation.js';
import { allUsers, loginUser, registerUser, userEvents } from '../controllers/userController.js';

export const userRouter = Express.Router();

userRouter.post('/user/auth/register', registerValidation, registerUser);
userRouter.post('/user/auth/login', loginUser);
userRouter.get('/user/:id/events', userEvents);
userRouter.get('/user', allUsers);
