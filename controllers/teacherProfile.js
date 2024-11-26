import Teacher from "../models/teacherProfile.js";
import User from "../models/user.js";

export default async function submitTeacherProfile(req, res) {
  try {
    const { userId,
         personalInfo,
          technicalSkills,
          experience
         } = req.body;

    console.log(userId);
    const user = await User.findById(userId);

    if (!user || user.role !== "teacher") {
      return res.status(400).json({
        message: "Invalid user or role is not teacher",
      });
    }

    const studentProfile = await Teacher.create({
      userId,
      personalInfo,
      technicalSkills,
     experience
    });

    console.log(user.profileComplete);

    user.profileComplete = true;
    const savedProfile = await user.save();

    res.status(201).json({
      message: "Profile submitted successfully",
      data: { studentProfile },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error submitting profile",
      error: `The error is ${error}`,
    });
  }
}
