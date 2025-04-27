import { FastifyReply, FastifyRequest } from "fastify";
import { Task } from "../types/Task";

// In-memory database (simple array)
let tasks: Task[] = [];

// Get all tasks
export const getAllTasks = async (request: FastifyRequest, reply: FastifyReply) => {
  reply.send(tasks);
};

// Create a new task
export const createTask = async (request: FastifyRequest, reply: FastifyReply) => {
  const { title, description } = request.body as { title: string; description: string };

  const newTask: Task = {
    id: Date.now().toString(),
    title,
    description,
    status: "pending",
  };

  tasks.push(newTask);
  reply.code(201).send(newTask);
};

// Delete a task by ID
export const deleteTask = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  tasks = tasks.filter(task => task.id !== id);
  reply.code(204).send();
};

// Update a task status (optional)
export const updateTaskStatus = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const { status } = request.body as { status: "pending" | "done" };

  const task = tasks.find(task => task.id === id);

  if (!task) {
    reply.code(404).send({ message: "Task not found" });
    return;
  }

  task.status = status;
  reply.send(task);
};
