import Quiz from '../models/quiz.js';
import Questions from '../models/questions.js'

export default async function createQuestion (req, res){
    const {quizId, question, options, correctAnswer} = req.body;

    try {

        const quiz = await Quiz.findById(quizId);

        if(!quiz){
            return res.status(404).json({
                message: "There is no such type of quiz id"
            })
        }

        const createQuestion = await Questions.create({
            quizId,
            question,
            options,
            correctAnswer
        })


        console.log("The question is saved")
        res.status(201).json({
            status: "Success",
            code: 201,
            message: "The question is created",
            data: {createQuestion}
        })
        
    } catch (error) {
        res.status(501).json({
            status: "Failed",
            code: 501,
            error: `The error is ${error}`
        })
    }
}