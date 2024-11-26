import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    personalInfo: {
      type: String,
      required: true,
    },
    technicalSkills: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    interests: {
      type: String,
      required: true,
    },
    hobbies: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("StudentProfile", studentProfileSchema);
