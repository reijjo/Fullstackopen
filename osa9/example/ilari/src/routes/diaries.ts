import express from "express";
import diaryService from "../services/diaryService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

// router.get("/", (_req, res) => {
//   res.send(diaryService.getEntries());
// });

router.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default router;
