"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
// ✅ CORS MUST BE FIRST
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost",
    "http://localhost:80",
    process.env.FRONTEND_URL, // Dynamically allow EC2 IP or any domain
].filter(Boolean);
// Dynamic CORS configuration function to handle same-origin, EC2, and local scenarios
app.use((0, cors_1.default)((req, callback) => {
    const origin = req.header("Origin");
    const host = req.header("Host");
    const forwardedHost = req.header("X-Forwarded-Host");
    let isAllowed = false;
    if (!origin) {
        // Allow requests with no origin (Postman, same-origin server requests)
        isAllowed = true;
    }
    else {
        try {
            const url = new URL(origin);
            // 1. Allow explicitly listed origins
            if (allowedOrigins.includes(origin)) {
                isAllowed = true;
            }
            // 2. Allow same-origin requests served via local host or reverse proxy
            else if (host && url.host === host) {
                isAllowed = true;
            }
            // 3. Allow same-origin requests served via forwarded proxy host (e.g. Nginx on EC2)
            else if (forwardedHost && url.host === forwardedHost) {
                isAllowed = true;
            }
            // 4. Allow AWS EC2 public DNS/Amazon domains
            else if (url.hostname.endsWith(".amazonaws.com")) {
                isAllowed = true;
            }
            // 5. Allow Render deployments
            else if (url.hostname.endsWith(".onrender.com")) {
                isAllowed = true;
            }
            // 6. Accept any IP-based HTTP origin (handles direct EC2 IP access)
            else if (/^\d+\.\d+\.\d+\.\d+$/.test(url.hostname)) {
                isAllowed = true;
            }
        }
        catch (_) {
            // ignore URL parse errors
        }
    }
    if (isAllowed) {
        callback(null, {
            origin: true, // Reflect the request origin back to the client
            credentials: true,
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"],
        });
    }
    else {
        console.log("CORS Rejected:", origin, "| Allowed:", allowedOrigins);
        callback(new Error("Not allowed by CORS"));
    }
}));
// ✅ Handle ALL preflight requests with same CORS config across-the-board
app.options("*any", (0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api/v1", routes_1.default);
// Health check
app.get("/", (_req, res) => {
    res.send("API is running");
});
// Global error handler (LAST)
app.use(error_middleware_1.globalErrorHandler);
exports.default = app;
