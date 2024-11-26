import Student from '../models/studentProfile.js'
import User from "../models/user.js";

export default async function submitStudentProfile(req, res) {
  try {
    const {
      userId,
      personalInfo,
      technicalSkills,
      education,
      interests,
      hobbies,
    } = req.body;


    console.log(userId)
    const user = await User.findById(userId);

    if (!user || user.role !== "student") {
      return res.status(400).json({
        message: "Invalid user or role is not student",
      });
    }

    const studentProfile = await Student.create({
      userId,
      personalInfo,
      technicalSkills,
      education,
      interests,
      hobbies,
    });

    console.log(user.profileComplete)

    user.profileComplete = true;
    const savedProfile = await user.save()

    res.status(201).json({
        message: "Profile submitted successfully",
        data: {savedProfile}
    })
  } catch (error) {
    res.status(500).json({
        message: "Error submitting profile", error
    })
  }
}
