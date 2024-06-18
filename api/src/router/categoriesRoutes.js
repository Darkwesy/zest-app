import Express from 'express';
import { getCategories } from '../controllers/categoriesController.js';

export const categoriesRouter = Express.Router();

categoriesRouter.get('/categories', getCategories);
