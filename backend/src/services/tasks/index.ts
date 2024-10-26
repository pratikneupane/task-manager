import { ITask } from "src/types/tasks.types";
import { Task } from "../../models/task.model";

const getAllTasks = (): Promise<ITask[] | null> => {
  return Task.find();
};

const createTask = (taskData: any): Promise<ITask> => {
  return Task.create(taskData);
};

const updateTask = (taskId: string, taskData: any): Promise<ITask | null> => {
  return Task.findByIdAndUpdate(taskId, taskData, { new: true });
};

const deleteTask = (taskId: string): Promise<ITask | null> => {
  return Task.findByIdAndDelete(taskId);
};

const TasksService = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};

export default TasksService;
