import { User } from "../database/models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password)
      throw new Error("Please provide all the fields");

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.round(100000 + Math.random() * 900000).toString();
    const user = new User({
      name,
      password: hashedPassword,
      email,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    //jwt generation and save cookie
    generateTokenAndSetCookie(res, user._id);

    res
      .status(201)
      .json({
        success: true,
        message: "User created successfully",
        user: { ...user._doc , password: undefined },
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const login = async (req, res) => {
  res.send("Login successful");
};
export const logout = async (req, res) => {
  res.send("Logout successful");
};
