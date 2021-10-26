const app = require("../server");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Todo = require("../models/Todo");

beforeEach((done) => {
    mongoose.connect("mongodb://localhost:27017/JestDB",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
  });
  
  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done())
    });
  });
  
test("GET /api/todos", async () => {
    const todo = await Todo.create({ title: "title 1", description: "Lorem ipsum" });
  
    await supertest(app).get("/api/todos")
      .expect(200)
      .then((response) => {
        // Check type and length
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toEqual(1);
  
        // Check data
        expect(response.body[0]._id).toBe(todo.id);
        expect(response.body[0].title).toBe(todo.title);
        expect(response.body[0].description).toBe(todo.description);
      });
  });
  
  test("POST /api/todos", async () => {
    const data = { title: "title 1", description: "Lorem ipsum" };
  
    await supertest(app).post("/api/todos")
      .send(data)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body._id).toBeTruthy();
        expect(response.body.title).toBe(data.title);
        expect(response.body.description).toBe(data.description);
  
        // Check data in the database
        const todo = await Todo.findOne({ _id: response.body._id });
        expect(todo).toBeTruthy();
        expect(todo.title).toBe(data.title);
        expect(todo.description).toBe(data.description);
      });
  });
  