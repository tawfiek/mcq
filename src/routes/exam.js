import { Router } from 'express';
import { startNewExam, submitExam } from '../controllers/exam';

const examRoute = Router();

examRoute.post('/new', startNewExam);
examRoute.post('/submit', submitExam);

export default examRoute;