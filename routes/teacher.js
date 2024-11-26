import express from 'express'
import teacherVerification from '../middlewares/verifyTeacher.js';
import submitTeacherProfile from '../controllers/teacherProfile.js';

const teacher = express.Router();

teacher.post('/profile', teacherVerification, submitTeacherProfile);

export default teacher;