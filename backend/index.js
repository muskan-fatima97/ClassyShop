import express from "express";
import cors from "cors";
import config from "./config.js";
import connectdb from "./src/db/db.js";
import logger from "./src/config/logger.js";
import app from './src/app.js';

const server = express();

// ✅ CORS setup
// Allows all origins for development/testing.
// Later in production, replace "*" with an array of trusted frontend URLs.
server.use(cors({
  origin: "*", // allow any origin
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// ✅ Body parser
server.use(express.json());

// ✅ Simple homepage to avoid 404
server.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ API routes
server.use("/api", app);

// ✅ Start server
const startServer = async () => {
  try {
    await connectdb();
    const PORT = config.PORT || 5000;
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
  }
};

startServer();
