import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import database connection
import { connectDB } from "./db.js";

// Import routes
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";

// Create an express app
const app = express();
// Set the port
const PORT = 3333;



// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/api", authRoutes);
app.use("/api", taskRoutes)

// Connect to database
connectDB();

app.listen(PORT);

console.log("Server started on port http://localhost:3333");
