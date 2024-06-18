import Express from 'express';
import { createEvent, getEvents, getEventById, updateEvent, inactiveEvent } from '../controllers/eventsController.js';
import { validateEventCreation } from '../middleware/eventCreationValidate.js';

export const eventRouter = Express.Router();

eventRouter.get('/events', getEvents);
eventRouter.get('/events/:id', getEventById);
eventRouter.post('/events', validateEventCreation, createEvent);
eventRouter.patch('/events/:id', validateEventCreation, updateEvent);
eventRouter.delete('/events/:id/inactive', inactiveEvent);
