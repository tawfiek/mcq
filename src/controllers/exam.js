import { Schema } from 'mongoose';
import Answers from '../models/Answers';
import Questions from '../models/Questions'
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export async function startNewExam (req, res, next) {
    try {
        // TODO: add the logic to start a new
        return res.json({message: 'Under development'})
    } catch (e) {
        console.error(e);
        throw e;
    }
}