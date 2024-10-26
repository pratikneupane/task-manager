import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import app from "../";

let mongoServer: MongoMemoryServer;

export const initMongoServer = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
};

export const stopMongoServer = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

export const registerUser = async (userData: { email: string; password: string }) => {
  await request(app).post("/api/v1/auth/register").send(userData);
  const res = await request(app).post("/api/v1/auth/login").send(userData);
  return res.headers["set-cookie"];
};

export const clearDatabase = async () => {
  await mongoose.connection.db.dropDatabase();
};
