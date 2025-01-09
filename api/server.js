import express from "express";
import { initializeContract, submitTask } from "../sdk/index.js";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/initialize", async (req, res) => {
  try {
    const { connection, wallet } = req.body;
    const response = await initializeContract(connection, wallet);
    res.status(200).json({ message: "Contract initialized", ...response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/task", async (req, res) => {
  try {
    const { input, connection, wallet } = req.body;
    const response = await submitTask(input, connection, wallet);
    res.status(200).json({ message: "Task submitted", response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`BuildAI API Server is running on http://localhost:${port}`);
});
