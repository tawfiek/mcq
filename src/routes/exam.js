import { Router } from 'express';
import { startNewExam } from '../controllers/exam';

const examRoute = Router();

examRoute.get('/new', startNewExam);

export default examRoute;