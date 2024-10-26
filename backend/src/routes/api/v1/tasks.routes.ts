import express from "express";
import TasksController from "../../../controllers/tasks.controllers";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../../..//validation/tasks.schema";
import validate from "../../..//middleware/validate.middleware";
import userAuth from "../../..//middleware/auth.middleware";
const router = express.Router();

router.get("/", userAuth, TasksController.getAllTasks);

router.post(
  "/",
  userAuth,
  validate(createTaskSchema),
  TasksController.createTask
);

router.put(
  "/:id",
  userAuth,
  validate(updateTaskSchema),
  TasksController.updateTask
);

router.delete(
  "/:id",
  userAuth,
  TasksController.deleteTask
);

export default router;
