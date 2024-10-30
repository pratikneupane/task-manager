export interface ITask {
  title: string;
  description: string;
  status: "TODO" | "completed" | "in-progress";
  createdAt?: Date;
  updatedAt?: Date;
  user: string;
}
