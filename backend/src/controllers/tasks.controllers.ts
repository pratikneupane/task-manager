import { Request, Response, NextFunction } from "express";
import TasksService from "../services/tasks/";
import Logger from "../utils/logger.utils";
import { IAuthRequest } from "src/types/auth.types";
import createHttpError from "../utils/httpErrors.utils";

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

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await TasksService.updateTask(req.params.id, req.body);
    if (!task) {
      throw createHttpError.NotFound("Task not found");
    }

    res
      .status(200)
      .json({ message: "Tasks Updated Successfully", response: task });
  } catch (error) {
    Logger.error("Error updating task:", error);
    next(error);
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await TasksService.deleteTask(req.params.id);
    if (!task) {
      throw createHttpError.NotFound("Task not found");
    }

    res
      .status(200)
      .json({ message: "Tasks Deleted Successfully", response: task });
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
