import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserPresent = await User.findOne({ email });
    if (!isUserPresent) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserPresent.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = await jwt.sign(
      { email: isUserPresent.email, id: isUserPresent._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: isUserPresent, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const isUserPresent = await User.findOne({ email });
    if (isUserPresent) {
      return res.status(400).json({ message: "User already exist" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password mismatch" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await new User({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
