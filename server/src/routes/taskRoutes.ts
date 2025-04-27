import { FastifyInstance } from "fastify";
import { getTasks, createTask, updateTaskStatus, deleteTask } from "../controllers/taskController";

export async function taskRoutes(fastify: FastifyInstance) {
  fastify.get("/tasks", getTasks);
  fastify.post("/tasks", createTask);
  fastify.put("/tasks/:id", updateTaskStatus);
  fastify.delete("/tasks/:id", deleteTask);
}
