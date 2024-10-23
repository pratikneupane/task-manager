import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import AuthRoutes from "./auth.routes";

/**
 * Handles the root route for the V1 APIs in the Task Manager API.
 *
 * @returns A JSON response with a message.
 */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Root of V1 APIs in Task Manager API",
  });
});

router.use("/auth", AuthRoutes);

export default router;
