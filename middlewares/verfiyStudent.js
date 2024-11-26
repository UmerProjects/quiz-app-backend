import jwt from "jsonwebtoken";
import { SECRET_ACCESS_TOKEN } from "../config/env.js";
import blacklist from "../models/blacklist.js";
import User from "../models/user.js";

export default async function studentVerification(req, res, next) {
  const authHeader = req.headers["authorization"];

  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.log(`the error is ${error}`)
  }

  const bearerToken = authHeader.split(" ")[1];

  const checkIfBlacklisted = await blacklist.findOne({ token: bearerToken });

  if (checkIfBlacklisted) {
    return res.status(401).json({
      message: "This section has baan expired please login again",
    });
  }

  try {
    const decoded = jwt.verify(bearerToken, SECRET_ACCESS_TOKEN);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (user.role !== "student") {
      return res.status(403).json({
        message: "Forbidden, Admin access required",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Invalid of expired token",
    });
  }
}
