import { z } from "zod";

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    status: z.enum(["pending", "completed", "in-progress"]).optional(),
    user: z.string().min(1, "User ID is required"),
  }),
});

export const updateTaskSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Task ID is required"),
  }),
  body: z
    .object({
      title: z.string().min(1).optional(),
      description: z.string().min(1).optional(),
      status: z.enum(["pending", "completed", "in-progress"]).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided to update the task",
    }),
});

export const taskByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Task ID is required"),
  }),
});
