import express, { Request, Response, NextFunction } from "express";
import apiRouter from "./v1/";
const router = express.Router();

/**
 * Handles the root route for the API, returning a JSON response with a message.
 *
 * @returns A JSON response with a message.
 */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Root of APIs in Task Manager API",
  });
});

router.use("/v1", apiRouter);

export default router;
