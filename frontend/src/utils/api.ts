import axios from "axios";
import { ApiResponse, Task, LoginCredentials, LoginResponse } from "../types";

const api = axios.create({
  baseURL: "http://localhost:9019/api/v1",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("TASK_MANAGER_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", credentials);

  localStorage.setItem("TASK_MANAGER_TOKEN", response.data.response.token);

  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await api.post("/auth/register", { email, password });
  return response.data;
};

export const getTasks = async (page: number = 1) => {
  const response = await api.get<ApiResponse<Task>>(`/tasks?page=${page}`);
  return response.data;
};

export const searchTasks = async (query: string) => {
  const response = await api.get<ApiResponse<Task>>(
    `/tasks/search?query=${query}`
  );
  return response.data;
};

export const createTask = async (task: Omit<Task, "id" | "user">) => {
  const response = await api.post("/tasks", task);
  return response.data;
};

export const updateTask = async (id: string, task: Partial<Task>) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string) => {
  await api.delete(`/tasks/${id}`);
};
