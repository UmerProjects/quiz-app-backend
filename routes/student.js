import express from 'express';
import submitStudentProfile from '../controllers/studentProfile.js';
import studentVerification from '../middlewares/verfiyStudent.js';

const student = express.Router();

student.post('/profile',studentVerification, submitStudentProfile)

export default student;



