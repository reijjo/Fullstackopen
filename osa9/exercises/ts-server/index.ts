import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello from the backend!");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  // const props = req.query;
  const { height, weight } = req.query;

  const isNotNumber = (argument: any): boolean => isNaN(Number(argument));

  if (isNotNumber(height) || isNotNumber(weight)) {
    res.json({ error: "malformetted parameters" });
  } else {
    console.log("hw", height, weight);
    const calculator = calculateBmi(Number(height), Number(weight));
    res.json({ weight: weight, height: height, bmi: calculator });
  }
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every(isValidNumber)
  ) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const result = calculateExercises(daily_exercises, target);
  res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}.`);
});

const isValidNumber = (value: any): boolean => !isNaN(Number(value));
