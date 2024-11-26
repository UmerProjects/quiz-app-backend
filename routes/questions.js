import express from 'express';
import createQuestion from '../controllers/questions.js';
import teacherVerification from '../middlewares/verifyTeacher.js';
import verifyQuiz from '../middlewares/verifyQuiz.js';

const question = express.Router();


question.post('/question',teacherVerification, createQuestion)

export default question;