import { z, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import Logger from "../utils/logger.utils";

const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void | Response => {
    
    const validation = schema.safeParse(req.body);

    if (!validation.success) {
      Logger.error("Validation error:", validation.error.errors);
      return res.status(400).json({
        message: "Invalid input",
        errors: validation.error.errors,
      });
    }

    req.body = validation.data;

    next();
  };

export default validate;
