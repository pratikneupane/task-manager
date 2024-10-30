import { z, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import Logger from "../utils/logger.utils";
import { capitalizeFirstLetter } from "../utils/string.utils";

/**
 * Middleware for validating request bodies against a provided Zod schema.
 *
 * @param {ZodSchema} schema - The Zod schema to validate the request body against.
 * @returns {(req: Request, res: Response, next: NextFunction) => void | Response} 
 * - A middleware function that validates the request body.
 *
 * If the request body is valid, it is passed to the next middleware. Otherwise,
 * a 400 response is sent with the validation errors. In case of an unexpected
 * error, a 500 response is returned.
 */
const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void | Response => {
    try {
      const validation = schema.safeParse(req.body);

      if (!validation.success) {
        const formattedErrors = validation.error.issues.map(
          (issue) =>
            `${capitalizeFirstLetter(issue.path.join("."))} is ${issue.message}`
        );

        Logger.error("Validation error:", formattedErrors);

        return res.status(400).json({
          message: "Validation Error",
          errors: formattedErrors,
        });
      }

      req.body = validation.data;
      next();
    } catch (error) {
      Logger.error("Unexpected validation error:", error);
      return res.status(500).json({
        message: "Internal Server Error",
        error: "An unexpected error occurred during validation",
      });
    }
  };

export default validate;
