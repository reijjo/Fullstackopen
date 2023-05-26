import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.get("/api/patients", (_req, res) => {
  res.send("moikka oon potilas");
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
