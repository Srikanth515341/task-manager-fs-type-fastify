import Fastify from "fastify";
import cors from "@fastify/cors";  // ✅ Add this import
import { taskRoutes } from "./routes/taskRoutes";

const fastify = Fastify({
  logger: true,
});

// Register CORS
const start = async () => {
  try {
    // ✅ Enable CORS for frontend running on localhost:5173
    await fastify.register(cors, {
      origin: "http://localhost:5173",
    });

    // Register routes
    fastify.register(taskRoutes);

    // Root route
    fastify.get("/", async (request, reply) => {
      return { message: "Server is running successfully!" };
    });

    await fastify.listen({ port: 5000 });
    console.log("Server listening on http://localhost:5000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
