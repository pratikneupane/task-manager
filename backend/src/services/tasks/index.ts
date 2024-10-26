import { ITask } from "src/types/tasks.types";
import { Task } from "../../models/task.model";

const getAllTasks = (userId: string): Promise<ITask[] | null> => {
  return Task.find({ user: userId });
};

const createTask = (taskData: any): Promise<ITask> => {
  return Task.create(taskData);
};

const updateTask = async (taskId: string, taskData: any): Promise<ITask | null> => {
  const task = await Task.findByIdAndUpdate(taskId, taskData, { new: true });
  return task;
};


const deleteTask = (taskId: string): Promise<ITask | null> => {
  return Task.findByIdAndDelete(taskId);
};

const getTaskById = (taskId: string): Promise<ITask | null> => {
  return Task.findById(taskId);
};

const TasksService = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
};

export default TasksService;
