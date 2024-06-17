import Express from 'express';
import { createEvent, getEvents, getEventById, updateEvent, inactiveEvent } from '../controllers/eventsController.js';
import { acessValidation } from '../middleware/acessValidation.js';

export const eventRouter = Express.Router();

eventRouter.get('/events', getEvents);
eventRouter.get('/events/:id', getEventById);
eventRouter.post('/events', createEvent);
eventRouter.patch('/events/:id/update', updateEvent);
eventRouter.delete('/events/:id/delete', inactiveEvent);
