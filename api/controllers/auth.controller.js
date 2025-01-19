import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
      field: !username ? "username" : !email ? "email" : "password",
    });
  }

  try {
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
        field: "username",
      });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
        field: "email",
      });
    }

    const hashedPassword = bcryptjs.hashSync(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json("User was registered successfully!");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
      field: !email ? "email" : "password",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    const isPasswordValid = bcryptjs.compareSync(password, user.password);

    if(!isPasswordValid) {
      return next(errorHandler(400, 'Invalid password'));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { password: userPassword, ...userInfo } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(userInfo);
  } catch (error) {
    next(error);
  }
};


export const google = async (req, res, next) => {
  
  try {
    const user = await User.findOne({ email: req.body.email });
    if(user){
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
      const {password: userPassword, ...userInfo} = user._doc;
      res.cookie("access_token", token, {httpOnly: true}).status(200).json(userInfo);
    }else{
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      console.log('generatedPassword', generatedPassword);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 12);
      const newUser = new User({
        username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });

      await newUser.save();
      const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
      const {password: userPassword, ...userInfo} = newUser._doc;

      res.cookie("access_token", token, {httpOnly: true}).status(200).json(userInfo);
    }
  } catch (error) {
    next(error);  
  }
};
