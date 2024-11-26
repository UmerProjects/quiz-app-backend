import User from "../models/user.js";
import bcrypt from "bcrypt";
import blacklist from "../models/blacklist.js";

export async function Register(req, res) {
  const { first_name, last_name, email, password, role } = req.body;

  console.log(role)
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({
        status: "failed",
        data: [],
        message: "It seems you already have an account, please log in instead.",
      });

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password,
      role,
    });

    console.log(newUser);
    const { ...user_data } = newUser._doc;
    res.status(200).json({
      status: "success",

      data: [user_data],
      message:
        "Thank you for registering with us. Your account has been successfully created.",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error",
    });
  }
  res.end();
}

export async function Login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");

    console.log(user);

    if (!user) {
      return res.status(401).json({
        status: "failed",
        data: {},
        message: "Invalid email or password.",
      });
    }

    console.log(password);

    console.log(user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "failed",
        data: {},
        message: "Invalid email or password.",
      });
    }

    console.log("Before everything");

    const token = user.generateAccessJWT();

    const { password: pwd, ...userData } = user._doc;

    res.status(200).json({
      status: "success",
      message: "You have successfully logged in.",
      token: `${token}`,
      user: userData,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      code: 500,
      data: [],
      message: "Internal Server Error inn the code",
    });
  }
}

export async function Logout(req, res) {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) return res.sendStatus(204);

    const bearerToken = authHeader.split(" ")[1];

    const checkIfBlacklisted = await blacklist.findOne({ token: bearerToken });

    console.log("extracted token", bearerToken);

    if (checkIfBlacklisted) return res.sendStatus(204);

    const newBlacklist = new blacklist({
      token: bearerToken,
    });

    await newBlacklist.save();

    res.setHeader("Clear-Site-Data", '"cookies"');

    res.status(200).json({ message: "You are logged out!" });
    
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
  res.end();
}
