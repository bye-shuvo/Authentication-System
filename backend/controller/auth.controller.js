import bcrypt from "bcryptjs";
import crypto from "crypto";

import { User } from "../database/models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail , sendResetPasswordEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password)
      throw new Error("Please provide all the fields");

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.round(
      100000 + Math.random() * 900000,
    ).toString();
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

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });

    await sendWelcomeEmail(user.email, user.name);
  } catch (error) {
    console.log("Error while verifying email", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    if (!user.isVerified)
      return res
        .status(400)
        .json({ success: false, message: "Verify your email first" });

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req , res) => {
  const { email } = req.body ;
  try {
    const user = await User.findOne({email});

    if(!user) return res.status(400).json({success : false , message : "User doesn't exists"});
    
    const resetToken = crypto.randomBytes(20).toString("hex");
    
    user.resetPasswordToken = resetToken ;
    user.resetPasswordTokenExpiresAt = Date.now() + 1 * 24 * 60 * 60 * 1000 ;
    await user.save();
    
    await sendResetPasswordEmail(user.email , `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

    res.status(200).json({success : true , message : "Password reset link is sent to your email"});

  } catch (error) {
    return res.status(500).json({success : false , message : error.message});
  }
}
