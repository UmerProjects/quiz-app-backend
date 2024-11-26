import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questions: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
});

export default mongoose.model("Quiz", quizSchema)
