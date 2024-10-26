import request from "supertest";
import {
  initMongoServer,
  stopMongoServer,
  clearDatabase,
  registerUser,
} from "../testSetup";
import app from "../..";

const userData = {
  email: "test@testmail.com",
  password: "Test@321#",
};

const userData2 = {
  email: "testuser1@example.com",
  password: "Password123!",
};

let cookie: any;
let cookie2: any;

beforeAll(initMongoServer);
afterEach(clearDatabase);
afterAll(stopMongoServer);

describe("POST /api/v1/tasks/", () => {
  beforeEach(async () => {
    cookie = await registerUser(userData);
  });

  it("Should create a new task when authenticated", async () => {
    const taskData = { title: "New Task", description: "This is a new task" };
    const res = await request(app)
      .post("/api/v1/tasks")
      .set("Cookie", cookie)
      .send(taskData);

    expect(res.status).toBe(201);
    expect(res.body.response).toHaveProperty("title", taskData.title);
  });

  it("Should not create a new task if unauthorized", async () => {
    const taskData = {
      title: "Unauthorized Task",
      description: "This task should not be created",
    };
    const res = await request(app).post("/api/v1/tasks").send(taskData);

    expect(res.status).toBe(401);
  });

  it("Should not create a new task if title is missing", async () => {
    const taskData = {
      description: "This task has no title",
    };

    const res = await request(app)
      .post("/api/v1/tasks")
      .set("Cookie", cookie)
      .send(taskData);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation Error");
    expect(res.body.errors).toContain("Title is Required");
  });

  it("Should not create a new task if description is missing", async () => {
    const taskData = {
      title: "No Description Task",
    };

    const res = await request(app)
      .post("/api/v1/tasks")
      .set("Cookie", cookie)
      .send(taskData);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation Error");
    expect(res.body.errors).toContain("Description is Required");
  });

  it("Should not create a new task with multiple validation errors", async () => {
    const taskData = {}; // Empty object to trigger both validations

    const res = await request(app)
      .post("/api/v1/tasks")
      .set("Cookie", cookie)
      .send(taskData);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation Error");
    expect(res.body.errors).toEqual(
      expect.arrayContaining(["Title is Required", "Description is Required"])
    );
  });
});

describe("GET /api/v1/tasks/", () => {
  beforeEach(async () => {
    cookie = await registerUser(userData);
    cookie2 = await registerUser(userData2);

    await request(app)
      .post("/api/v1/tasks")
      .set("Cookie", cookie)
      .send({ title: "Task 1", description: "Description for Task 1" });
    await request(app)
      .post("/api/v1/tasks")
      .set("Cookie", cookie)
      .send({ title: "Task 2", description: "Description for Task 2" });

    await request(app).post("/api/v1/tasks").set("Cookie", cookie2).send({
      title: "Task 1 from User 2",
      description: "Description for Task 1 from User 2",
    });
  });

  it("Should retrieve all tasks when authenticated", async () => {
    const res = await request(app).get("/api/v1/tasks").set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.response).toBeDefined();
    expect(res.body.response.length).toBe(2);
    expect(res.body.response[0]).toHaveProperty("title", "Task 1");
    expect(res.body.response[1]).toHaveProperty("title", "Task 2");
  });

  it("Should not retrieve tasks if unauthorized", async () => {
    const res = await request(app).get("/api/v1/tasks");

    expect(res.status).toBe(401);
  });

  it("Should not retrieve tasks from other users", async () => {
    const res = await request(app).get("/api/v1/tasks").set("Cookie", cookie2);

    expect(res.status).toBe(200);
    expect(res.body.response).toBeDefined();
    expect(res.body.response.length).toBe(1);
    expect(res.body.response[0]).toHaveProperty("title", "Task 1 from User 2");
  });
});

let taskId: string;
describe("DELETE /api/v1/tasks/:id", () => {
  beforeEach(async () => {
    cookie = await registerUser(userData);
    const taskResponse = await request(app)
      .post("/api/v1/tasks")
      .set("Cookie", cookie)
      .send({
        title: "Task from User 1",
        description: "Description for Task from User 1",
      });

    taskId = taskResponse.body.response._id;

    cookie2 = await registerUser(userData2);
  });

  it("Should delete a task when the authenticated user created it", async () => {
    const res = await request(app)
      .delete(`/api/v1/tasks/${taskId}`)
      .set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Task Deleted Successfully");

    const fetchResponse = await request(app)
      .get(`/api/v1/tasks/${taskId}`)
      .set("Cookie", cookie);

    expect(fetchResponse.status).toBe(404);
  });

  it("Should not delete a task if unauthorized", async () => {
    const response = await request(app).delete(`/api/v1/tasks/${taskId}`);

    expect(response.status).toBe(401);
  });

  it("Should not delete a task created by another user", async () => {
    const taskResponse = await request(app)
      .post("/api/v1/tasks")
      .set("Cookie", cookie2)
      .send({
        title: "Task from User 2",
        description: "Description for Task from User 2",
      });

    const anotherTaskId = taskResponse.body.response._id;

    const response = await request(app)
      .delete(`/api/v1/tasks/${anotherTaskId}`)
      .set("Cookie", cookie);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe(
      "You do not have permission to delete this task"
    );
  });

  it("Should return 404 if task does not exist", async () => {
    const nonExistentTaskId = "605c72c3f3aefb00251b75d9";

    const response = await request(app)
      .delete(`/api/v1/tasks/${nonExistentTaskId}`)
      .set("Cookie", cookie);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Task not found");
  });
});

describe("PUT /api/v1/tasks/:id", () => {
  beforeEach(async () => {
    cookie = await registerUser(userData);

    const taskData = {
      title: "Initial Task",
      description: "This is the initial task.",
    };
    const res = await request(app)
      .post("/api/v1/tasks")
      .set("Cookie", cookie)
      .send(taskData);

    taskId = res.body.response._id;
  });

  it("Should edit the task when authenticated and the owner", async () => {
    const updatedTaskData = {
      title: "Updated Task",
      description: "This task has been updated.",
    };
    const response = await request(app)
      .put(`/api/v1/tasks/${taskId}`)
      .set("Cookie", cookie)
      .send(updatedTaskData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Task Updated Successfully");
    expect(response.body.response).toHaveProperty(
      "title",
      updatedTaskData.title
    );
  });

  it("Should not edit a task if unauthorized", async () => {
    const updatedTaskData = { title: "Unauthorized Update", description: "This should not be updated." };
    const response = await request(app).put(`/api/v1/tasks/${taskId}`).send(updatedTaskData);

    expect(response.status).toBe(401);
  });

  it("Should not edit a task if the task ID is invalid", async () => {
    const updatedTaskData = { title: "Invalid Task", description: "This task ID is invalid." };
    const response = await request(app)
      .put(`/api/v1/tasks/invalidTaskId`)
      .set("Cookie", cookie)
      .send(updatedTaskData);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Task not found");
  });

  it("Should not edit a task from another user", async () => {
    const cookie2 = await registerUser(userData2);
    const updatedTaskData = { title: "Another User Update", description: "This should not be allowed." };
    const response = await request(app)
      .put(`/api/v1/tasks/${taskId}`)
      .set("Cookie", cookie2)
      .send(updatedTaskData);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("You do not have permission to edit this task");
  });
});
