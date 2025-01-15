import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message : 'All fields are required',
            field : !username ? 'username' : !email ? 'email' : 'password'
        });
    }

  try {

    const existingUsername = await User.findOne({ username });

    if(existingUsername) {
        return res.status(400).json({
            success: false,
            message: 'Username already exists',
            field: 'username'
        });
    }

    const existingEmail = await User.findOne({ email });

    if(existingEmail) {
        return res.status(400).json({
            success: false,
            message: 'Email already exists',
            field: 'email'
        });
    }

    const hashedPassword = bcryptjs.hashSync(password, 12);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    await newUser.save();
    res.status(200).json("User was registered successfully!");
  } catch (error) {
    next(error);
  }
};
