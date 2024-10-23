import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

/**
 * Handles the root route of the Task Manager API, returning a JSON response with a message.
 *
 * @returns A JSON response with a message.
 */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Root of Task Manager API",
  });
});

export default router;
