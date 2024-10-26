import { Request, Response, NextFunction } from "express";
import AuthService from "../services/auth";
import Logger from "../utils/logger.utils";
import { COOKIE_NAMES } from "../constants/cookie.constants";
import createHttpError from "../utils/httpErrors.utils";

const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await AuthService.register(email, password);
    if (!user) {
      Logger.error("User Registration failed for email:", email);
      throw createHttpError.BadRequest("User Registration failed");
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
      throw createHttpError.Unauthorized("Invalid credentials");
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
    // Check if the error is an instance of HttpError
    if (error instanceof Error && 'statusCode' in error) {
      return next(error);
    }
    next(createHttpError.InternalServerError("Something went wrong, please try again."));
  }
};
const AuthController = {
  register: registerController,
  login: loginController,
};

export default AuthController;
