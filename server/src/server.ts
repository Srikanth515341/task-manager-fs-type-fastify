// server/src/server.ts

import Fastify from "fastify";
import cors from "@fastify/cors"; // 👈 important
import { taskRoutes } from "./routes/taskRoutes";

const fastify = Fastify({
  logger: true,
});

// Register CORS
fastify.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"], // 👈 allow PUT, DELETE also
});

// Register routes
fastify.register(taskRoutes);

// Root route
fastify.get("/", async (request, reply) => {
  return { message: "Server is running successfully!" };
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 5000 });
    console.log("Server listening on http://localhost:5000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
