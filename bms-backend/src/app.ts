import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import routes from "./routes";
import { globalErrorHandler } from "./middlewares/error.middleware";

dotenv.config();

const app = express();

// ✅ CORS MUST BE FIRST
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Postman / server-to-server
      if (origin === "http://localhost:5173") return callback(null, true);
      if (origin.endsWith(".onrender.com")) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle ALL preflight requests
app.options("*", cors());

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/v1", routes);

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.send("API is running");
});

// Global error handler (LAST)
app.use(globalErrorHandler);

export default app;
