import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import articleRoutes from "./src/routes/article.routes.js";

// Load environment variables from .env
dotenv.config();

const app = express();

/* -------------------- MIDDLEWARE -------------------- */

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

/* -------------------- ROUTES -------------------- */

// Health check (optional but good practice)
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "BeyondChats Backend is running 🚀",
  });
});

// Article CRUD routes
app.use("/articles", articleRoutes);

/* -------------------- SERVER START -------------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
