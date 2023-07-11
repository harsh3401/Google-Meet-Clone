import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.status(200).send("test");
});
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
