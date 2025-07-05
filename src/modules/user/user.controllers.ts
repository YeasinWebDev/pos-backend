import { Request, Response } from "express";
import User from "./user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser } from "./user.interface";

const createToken = (user: IUser) => {
  return jwt.sign({ user }, process.env.JWT_SECRET!, { expiresIn: "7d" });
};

export const CreateUser = async (req: Request, res: Response) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create(req.body);
    
    const token = createToken(newUser);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).send({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to create user",
      error: error,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = createToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to login user",
      error: error,
    });
  }
};
