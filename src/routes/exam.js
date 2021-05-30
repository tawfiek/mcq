import { Router } from 'express';
import { startNewExam, submitExam } from '../controllers/exam';

const examRoute = Router();

examRoute.get('/new', startNewExam);
examRoute.get('/submit', submitExam);

export default examRoute;