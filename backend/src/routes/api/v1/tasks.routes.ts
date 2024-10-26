import express from "express";
import TasksController from "../../../controllers/tasks.controllers";
import {
  createTaskSchema,
  updateTaskSchema,
  taskByIdSchema,
} from "../../..//validation/tasks.schema";
import validate from "../../..//middleware/validate.middleware";
const router = express.Router();

router.get("/", TasksController.getAllTasks);

router.post("/", validate(createTaskSchema), TasksController.createTask);

router.put("/:id", validate(updateTaskSchema), TasksController.updateTask);

router.delete("/:id", validate(taskByIdSchema), TasksController.deleteTask);

export default router;
