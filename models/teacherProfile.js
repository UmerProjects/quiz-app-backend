import mongoose, { Mongoose } from "mongoose";

const teacherProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    personalInfo: {
        type: String,
        required: [true, "Kindly write about your personnal Information"]
    },
    technicalSkills: {
        type: String,
        required: [true, "Kindly write about your technical skills"]
    },
    experience: {
        type: Number,
        required: [true, "Kindly write about your required experience to proceed"]
    }
})

export default mongoose.model("Teacher", teacherProfileSchema)