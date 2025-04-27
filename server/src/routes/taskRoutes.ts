import { FastifyInstance } from "fastify";
import { getAllTasks, createTask, deleteTask, updateTaskStatus } from "../controllers/taskController";

export async function taskRoutes(fastify: FastifyInstance) {
  fastify.get("/tasks", getAllTasks);
  fastify.post("/tasks", createTask);
  fastify.delete("/tasks/:id", deleteTask);
  fastify.patch("/tasks/:id", updateTaskStatus);
}
