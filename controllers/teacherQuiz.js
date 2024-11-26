import Quiz from '../models/quiz.js';
import User from '../models/user.js'

export default async function createQuiz(req, res) {
    const {title, description, createdBy} = req.body;

    try {

        let user= await User.findById(createdBy)

        console.log(user)

        let saverQuiz = await Quiz.create({
            title,
            description,
            createdBy
        })

        res.status(201).json({
            status: "Success",
            code: 201,
            data: {saverQuiz}
        })

        
    } catch (error) {
        res.status(401).json({
            status: "Failed",
            code: 501,
            error: `The error is: ${error}`
        })
    }
}