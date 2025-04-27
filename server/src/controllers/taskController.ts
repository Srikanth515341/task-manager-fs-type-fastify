import { FastifyRequest, FastifyReply } from "fastify";
import { Task } from "../types/Task";

// Temporary in-memory tasks array
let tasks: Task[] = [];

export const getTasks = async (request: FastifyRequest, reply: FastifyReply) => {
  reply.send(tasks);
};

export const createTask = async (request: FastifyRequest, reply: FastifyReply) => {
  const { title } = request.body as { title: string };

  if (!title) {
    reply.status(400).send({ message: "Title is required" });
    return;
  }

  const newTask: Task = {
    id: Date.now().toString(),
    title,
    status: "pending",
  };

  tasks.push(newTask);
  reply.status(201).send(newTask);
};

export const updateTaskStatus = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const { status } = request.body as { status: "pending" | "done" };

  const task = tasks.find((task) => task.id === id);
  if (!task) {
    reply.status(404).send({ message: "Task not found" });
    return;
  }

  task.status = status;
  reply.send(task);
};

export const deleteTask = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  tasks = tasks.filter((task) => task.id !== id);
  reply.status(204).send();
};
