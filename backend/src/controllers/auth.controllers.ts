import { Request, Response, NextFunction } from "express";
import AuthService from "../services/auth";
import Logger from "../utils/logger.utils";
import { COOKIE_NAMES } from "../constants/cookie.constants";

const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await AuthService.register(email, password);
    if (!user) {
      Logger.error("User Registration failed");
      return res.status(400).json({ message: "User Registration failed" });
    }
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    Logger.error("Register error:", error);
    next(error);
  }
};

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const token = await AuthService.login(email, password);
    if (!token) {
      Logger.error("Login failed for email:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.cookie(COOKIE_NAMES.TASK_MANAGER_TOKEN, token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    Logger.error("Login error:", error);
    next(error);
  }
};

const AuthController = {
  register: registerController,
  login: loginController,
};

export default AuthController;
