import { isValidObjectId, Schema } from 'mongoose';
import Answers from '../models/Answers';
import Questions from '../models/Questions'
import {getRandomNumbersInRange, isObject, tryTo, validateEmail} from '../utils/helpers';
import mongoose from 'mongoose';
import Exam from '../models/Exam';

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export async function startNewExam (req, res, next) {
    try {

        const body = req.body;
        const {isValid, errors} = _validateUserNewExamInput(req.body);

        if (!isValid) return res.status(422).json({message: 'Check your input ', errors});

        const allQuestions = await Questions.find().populate('options');
        const fiveQuestionsToSend = _getRandomQuestionsFunction(5)(allQuestions);

        const exam = await Exam.create({
            questions: fiveQuestionsToSend.map(q => q._id),
            userName: body.userName,
            email: body.email
        });

        return res.json({message: 'success', exam, questions: fiveQuestionsToSend});
    } catch (e) {
        console.error(e);
        next(e);
    }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export async function submitExam (req, res, next) {
    try {
        
        const body = req.body;
        const {isValid, errors} = _validateUserSubmitExamInput(req.body);

        if (!isValid) return res.status(422).json({message: 'Check your input ', errors});

        const exam = await Exam.updateOne({_id: body.examID}, {score: body.score});

        return res.json({message: 'success'});
    } catch (e) {
        console.error(e);
        next(e);
    }
}

/**
 * Validate suer input in the submit exam endpoint
 * @param {Object} body
 * @param {String} [body.examID] the Exam ID
 * @param {Number} [body.score] The score on this exam
 */
function _validateUserSubmitExamInput (body) {
    const errors = [];
    if (! isObject(body)) {
        errors.push("Not a valid request !");
        return {isValid: false, errors}
    };

    if (!body.examID || typeof body.examID !== 'string') errors.push("Exam ID is not valid !");
    if (typeof +body.score !== 'number' || Number.isNaN(+body.score)) errors.push("Score is not valid !");

    return {isValid: errors.length < 1, errors};

}

/**
 * Validate the user input in the request body
 * @param {Object} body
 * @param {String} [body.userName] This should be a valid string
 * @param {String} [body.email] This should a valid email
 * @return {isValid: Boolean, errors: Array<String>} the validation object
 */
function _validateUserNewExamInput (body) {
    const errors = [];
    if (! isObject(body)) {
        errors.push("Not a valid request !");
        return {isValid: false, errors}
    };

    if (!body.userName || typeof body.userName !== 'string') errors.push("Name is not valid !");
    if (!validateEmail(body.email)) errors.push("email is not valid !");

    return {isValid: errors.length < 1, errors};
}

/**
 * High order function making carrying of the number
 * then returns a function that returns an array of number of random questions
 * of the provided ones
 * @param {Number} number
 */
function _getRandomQuestionsFunction (number) {
    return function _randomQuestions (questions) {
        if (number === questions.length ) return questions;
        const randomNumbers = getRandomNumbersInRange(number, {min: 0, max: questions.length});
        return randomNumbers.map(n => questions[n]);
    }
}
