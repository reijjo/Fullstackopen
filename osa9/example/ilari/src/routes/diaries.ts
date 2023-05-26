import express from "express";
import diaryService from "../services/diaryService";
import toNewDiaryEntry from "../utils";

const router = express.Router();

// /api/diaries

router.get("/", (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

// router.get("/", (_req, res) => {
//   res.send(diaryService.getEntries());
// });

router.post("/", (req, res) => {
  // const { date, weather, visibility, comment } = req.body;
  // const addedEntry = diaryService.addDiary({
  //   date,
  //   weather,
  //   visibility,
  //   comment,
  // });
  // res.json(addedEntry);
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);

    const addedEntry = diaryService.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

// /api/diaries/:id

router.get("/:id", (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

export default router;
