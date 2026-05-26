import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as UserService from "./user.service";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    await UserService.createUser({ username, email, password });

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error: any) {
    // Duplicate email error
    if (error.code === 11000) {
      res.status(409).json({ message: "Email already exists" });
      return;
    }

    res.status(500).json({
      message: error.message || "Signup failed",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log("[Login] Attempt for email:", email);

    if (!email || !password) {
      res.status(400).json({ success: false, message: "Email and password are required" });
      return;
    }

    const user = await UserService.validateUser(email, password);

    if (!user) {
      console.log("[Login] Invalid credentials for:", email);
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("[Login] JWT_SECRET is not defined in environment");
      res.status(500).json({ success: false, message: "Server configuration error" });
      return;
    }

    console.log("[Login] User validated, generating token for:", email);

    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
      },
      jwtSecret,
      { expiresIn: "7d" }
    );

    console.log("[Login] Token generated successfully for:", email);
    res.json({ success: true, token });
  } catch (error: any) {
    console.error("[Login] Unexpected error:", error.message, error.stack);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message || String(error),
    });
  }
};
