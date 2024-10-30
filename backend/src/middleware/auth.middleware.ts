import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IAuthRequest, IUser } from "../types/auth.types";
import createHttpError from "../utils/httpErrors.utils";

const JWT_SECRET = process.env.JWT_SECRET || "JWTisthebestwaytoencrypt";

/**
 * Express middleware to authenticate the user.
 *
 * Checks if the request contains a valid token and stores the user's data in
 * the request object.
 *
 * @throws {Unauthorized} If the token is invalid, expired or not provided.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next function.
 */

const userAuth = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { TASK_MANAGER_TOKEN } = req.cookies;

  if (!TASK_MANAGER_TOKEN) {
    return next(
      createHttpError.Unauthorized("Access denied. No token provided.")
    );
  }

  try {
    const decoded = jwt.verify(TASK_MANAGER_TOKEN, JWT_SECRET) as Pick<
      IUser,
      "id" | "email"
    >;

    req.user = {
      id: decoded.id,
      email: decoded.email,
      password: "", // Just for the sake of the type, but it's not used in the middleware
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(createHttpError.Unauthorized("Token has expired"));
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return next(createHttpError.Unauthorized("Invalid token"));
    }

    return next(
      createHttpError.InternalServerError("Failed to authenticate token")
    );
  }
};

export default userAuth;
