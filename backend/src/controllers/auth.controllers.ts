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
    res
      .status(201)
      .json({ message: "User registered successfully", response: user });
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
    const userInfo = await AuthService.login(email, password);
    const token = userInfo?.token;
    const user = userInfo?.user;
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

    res.status(200).json({ message: "Login successful", response: { token, user } });
  } catch (error) {
    Logger.error("Login error:", error);
    if (error instanceof Error && "statusCode" in error) {
      return next(error);
    }
    next(
      createHttpError.InternalServerError(
        "Something went wrong, please try again."
      )
    );
  }
};
const AuthController = {
  register: registerController,
  login: loginController,
};

export default AuthController;
