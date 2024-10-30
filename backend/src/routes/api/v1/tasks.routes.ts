import express from "express";
import TasksController from "../../../controllers/tasks.controllers";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../../..//validation/tasks.schema";
import validate from "../../..//middleware/validate.middleware";
import userAuth from "../../..//middleware/auth.middleware";
const router = express.Router();

/**
 * @method GET
 * @description Get all tasks
 * @name endpoint /api/v1/tasks
 * @param {string} path - Express path
 * @param {middleware} middleware - User authentication middleware
 * @param {callback} controller - TasksController.getAllTasks
 */
router.get("/", userAuth, TasksController.getAllTasks);

/**
 * @method POST
 * @description Create a new task
 * @name endpoint /api/v1/tasks
 * @param {string} path - Express path
 * @param {middleware} middleware - User authentication and validation middleware
 * - @middleware validate(createTaskSchema)
 * @param {callback} controller - TasksController.createTask
 */
router.post(
  "/",
  userAuth,
  validate(createTaskSchema),
  TasksController.createTask
);

/**
 * @method PUT
 * @description Update a task
 * @name endpoint /api/v1/tasks/:id
 * @param {string} path - Express path
 * @param {middleware} middleware - User authentication and validation middleware
 * - @middleware validate(updateTaskSchema)
 * @param {callback} controller - TasksController.updateTask
 */
router.put(
  "/:id",
  userAuth,
  validate(updateTaskSchema),
  TasksController.updateTask
);

/**
 * @method DELETE
 * @description Delete a task
 * @name endpoint /api/v1/tasks/:id
 * @param {string} path - Express path
 * @param {middleware} middleware - User authentication middleware
 * @param {callback} controller - TasksController.deleteTask
 */
router.delete(
  "/:id",
  userAuth,
  TasksController.deleteTask
);

/**
 * @method GET
 * @description Search tasks
 * @name endpoint /api/v1/tasks/search
 * @param {string} path - Express path
 * @param {middleware} middleware - User authentication middleware
 * @param {callback} controller - TasksController.searchTasks
 */
router.get("/search", userAuth, TasksController.searchTasks);

export default router;