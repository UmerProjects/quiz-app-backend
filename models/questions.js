import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: [true, "The quiz is ready to make the questions"]
    },
    title: {
        type: String,
    },
    question: {
        type: String,
        required: [true, "Write the question"],
    },
    options: {
        type: Array,
        required: [true, "Kindly apply the options to"]
    },
    correctAnswer: {
        type: String,
        required: [true, "Kindly give the correct answers"]
    }
})


export default mongoose.model('Question', questionSchema)