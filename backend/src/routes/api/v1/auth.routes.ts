import express, { Request, Response, NextFunction } from "express";
import AuthController from "../../../controllers/auth/";
import { loginSchema, registerSchema } from "../../..//validation/auth.schema";
import validate from "../../..//middleware/validate.middleware";
const router = express.Router();

/**
 * @method POST
 * @description Route to authenticate user login.
 * @name endpoint /api/v1/auth/login
 * @param {string} path - Express path
 * @param {middleware} middleware - Validate middleware
 * - @middleware validate(loginSchema)
 * @param {callback} controller - AuthController.login
 */
router.post("/login", validate(loginSchema), AuthController.login);

/**
 * @method POST
 * @description Route to register a new user.
 * @name endpoint /api/v1/auth/register
 * @param {string} path - Express path
 * @param {middleware} middleware - Validate middleware
 * - @middleware validate(registerSchema)
 * @param {callback} controller - AuthController.register
 */
router.post("/register", validate(registerSchema), AuthController.register);

export default router;
