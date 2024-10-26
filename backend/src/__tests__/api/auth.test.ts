import request from "supertest";
import { initMongoServer, stopMongoServer, clearDatabase, registerUser } from "../testSetup";
import app from "../.."

const userData = {
  email: "testuser@example.com",
  password: "Password123!",
};

beforeAll(initMongoServer);
afterEach(clearDatabase);
afterAll(stopMongoServer);

describe("POST /register", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/api/v1/auth/register").send(userData);
    expect(res.statusCode).toEqual(201);
  });

  it("should fail with a 400 for invalid data", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({ username: "short", password: "123" });
    expect(res.statusCode).toEqual(400);
  });
});

describe("POST /login", () => {
  beforeEach(async () => {
    await registerUser(userData);
  });

  it("should login an existing user", async () => {
    const res = await request(app).post("/api/v1/auth/login").send(userData);
    expect(res.statusCode).toEqual(200);
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  it("should return 401 for incorrect credentials", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({ email: userData.email, password: "wrongpassword" });
    expect(res.statusCode).toEqual(401);
  });
});
