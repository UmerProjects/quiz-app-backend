
export default async function verifyQuiz(req, res, next) {
  try {
    if (user.profileComplete == false) {
      return res.status(400).json({
        message: `kindly fill out the profileCompletion`,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(501).json({
      status: "Failed",
      error: `The process is failed due to the ${error}`,
    });
  }
}
