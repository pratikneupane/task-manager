import { Request, Response, NextFunction } from "express";
import TasksService from "../services/tasks/";
import Logger from "../utils/logger.utils";
import { IAuthRequest } from "src/types/auth.types";

const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await TasksService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    Logger.error("Error fetching tasks:", error);
    next(error);
  }
};
const createTask = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const task = await TasksService.createTask({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json(task);
  } catch (error) {
    Logger.error("Error creating task:", error);
    next(error);
  }
};
const getTaskByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await TasksService.getTaskByUserId(req.params.id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    Logger.error("Error fetching task:", error);
    next(error);
  }
};
const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await TasksService.updateTask(req.params.id, req.body);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    Logger.error("Error updating task:", error);
    next(error);
  }
};
const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await TasksService.deleteTask(req.params.id);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    Logger.error("Error deleting task:", error);
    next(error);
  }
};
const TaskController = {
  getAllTasks,
  createTask,
  getTaskByUserId,
  updateTask,
  deleteTask,
};

export default TaskController;
