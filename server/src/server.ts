import Fastify from "fastify";

// Create Fastify instance
const fastify = Fastify({
  logger: true,
});

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
