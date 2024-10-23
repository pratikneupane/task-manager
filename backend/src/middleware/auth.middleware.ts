import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IAuthRequest } from "../types/auth.types";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Middleware to validate JWT
export const validateToken = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded as IAuthRequest["user"];
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
