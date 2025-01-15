import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 12);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });

    await newUser.save();
    res.status(200).json("User was registered successfully!");
  } catch (error) {
    return res.status(400).send("Error. Try again.");
  }
};
