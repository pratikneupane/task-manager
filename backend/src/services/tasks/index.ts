import { ITask } from "src/types/tasks.types";
import { Task } from "../../models/task.model";

const getAllTasks = (userId: string, page: number): Promise<ITask[] | null> => {
  return Task.find({ user: userId }).skip((page - 1) * 10).limit(10);
};

const getTotalTasksCount = (userId: string): Promise<number> => {
  return Task.countDocuments({ user: userId });
};

const searchTasks = (
  userId: string,
  searchCriteria: string
): Promise<ITask[] | null> => {
  const regex = new RegExp(searchCriteria, 'i');
  
  return Task.find({
    user: userId,
    $or: [
      { title: regex },
      { description: regex }
    ]
  });
}

const createTask = (taskData: any): Promise<ITask> => {
  return Task.create(taskData);
};

const updateTask = async (
  taskId: string,
  taskData: any
): Promise<ITask | null> => {
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
  getTotalTasksCount,
  searchTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
};

export default TasksService;
