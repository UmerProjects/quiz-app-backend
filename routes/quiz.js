import express from "express";
import teacherVerification from "../middlewares/verifyTeacher.js";
import createQuiz from "../controllers/teacherQuiz.js";

const quiz = express.Router();

quiz.post('/quiz', teacherVerification, createQuiz)

export default quiz;