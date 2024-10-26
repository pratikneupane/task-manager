import { Request, Response, NextFunction } from "express";
import TasksService from "../services/tasks/";
import Logger from "../utils/logger.utils";
import { IAuthRequest } from "src/types/auth.types";
import createHttpError from "../utils/httpErrors.utils";
import mongoose from "mongoose";

const getAllTasks = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw createHttpError.Unauthorized("Unauthorized");
    }

    const tasks = await TasksService.getAllTasks(req.user.id!);
    res
      .status(200)
      .json({ message: "Tasks Fetched Successfully", response: tasks });
  } catch (error) {
    Logger.error("Error fetching tasks:", error);
    next(createHttpError.InternalServerError("Failed to fetch tasks"));
  }
};

const createTask = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw createHttpError.Unauthorized("Unauthorized");
    }

    const task = await TasksService.createTask({
      ...req.body,
      user: req.user.id,
    });

    res
      .status(201)
      .json({ message: "Task Created Successfully", response: task });
  } catch (error) {
    Logger.error("Error creating task:", error);
    next(error);
  }
};

const updateTask = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      throw createHttpError.NotFound("Task not found");
    }
    const task = await TasksService.getTaskById(req.params.id);

    if (!req.user) {
      throw createHttpError.Unauthorized("Unauthorized");
    }

    if (!task) {
      throw createHttpError.NotFound("Task not found");
    }

    if (task.user.toString() !== req.user.id) {
      throw createHttpError.Forbidden(
        "You do not have permission to edit this task"
      );
    }

    let updatedTask = await TasksService.updateTask(req.params.id, req.body);

    res
      .status(200)
      .json({ message: "Task Updated Successfully", response: updatedTask });
  } catch (error) {
    Logger.error("Error updating task:", error);
    next(error);
  }
};

const deleteTask = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await TasksService.getTaskById(req.params.id);

    if (!req.user) {
      throw createHttpError.Unauthorized("Unauthorized");
    }

    if (!task) {
      throw createHttpError.NotFound("Task not found");
    }
    if (task.user.toString() !== req.user.id) {
      throw createHttpError.Forbidden(
        "You do not have permission to delete this task"
      );
    }

    const deletedTask = await TasksService.deleteTask(req.params.id);

    res
      .status(200)
      .json({ message: "Task Deleted Successfully", response: deletedTask });
  } catch (error) {
    Logger.error("Error deleting task:", error);
    next(error);
  }
};

const TaskController = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};

export default TaskController;
