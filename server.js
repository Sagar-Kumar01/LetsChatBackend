import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { serve } from "inngest/express";

import connectDB from "./configs/db.js";
import { inngest, functions } from "./inngest/index.js";

dotenv.config();

const app = express();

app.use("/api/inngest", serve({ client: inngest, functions }));

app.use(cors());
app.use(express.json());


connectDB();

/**
 * Health check
 */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
