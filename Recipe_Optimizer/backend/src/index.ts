import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import recipeRoutes from "./routes/recipeRoutes";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || "8080", 10);

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/recipes", recipeRoutes);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
