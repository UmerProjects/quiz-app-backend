import User from "../models/user.js";
import bcrypt from "bcrypt";


export async function Register(req, res) {
  const { first_name, last_name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        status: "failed",
        data: [],
        message: "It seems you already have an account, please log in instead.",
      });
    // create an instance of a user


    const newUser = new User({
      first_name,
      last_name,
      email,
      password,
      role,
    });

    const savedUser = await newUser.save(); // save new user into the database
    console.log(savedUser);
    const { ...user_data } = savedUser._doc;
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


