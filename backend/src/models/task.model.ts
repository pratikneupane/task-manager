import mongoose from "mongoose";
import { ITask } from "../types/tasks.types";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["TODO", "DONE", "IN_PROGRESS"],
    default: "TODO",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Task = mongoose.model<ITask>("Task", taskSchema);
