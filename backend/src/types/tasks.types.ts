export interface ITask {
  title: string;
  description: string;
  status: "pending" | "completed" | "in-progress";
  createdAt?: Date;
  updatedAt?: Date;
  userId: string;
}
