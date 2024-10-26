import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IAuthRequest, IUser } from "../types/auth.types";

const JWT_SECRET = process.env.JWT_SECRET || "JWTisthebestwaytoencrypt";

const userAuth = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { TASK_MANAGER_TOKEN } = req.cookies;

  if (!TASK_MANAGER_TOKEN) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(TASK_MANAGER_TOKEN, JWT_SECRET) as Pick<IUser, "id" | "email">;

    req.user = {
      id: decoded.id,
      email: decoded.email,
      password: "", // Just for the sake of the type, but it's not used in the middleware
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Token has expired",
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to authenticate token",
    });
  }
};

export default userAuth;