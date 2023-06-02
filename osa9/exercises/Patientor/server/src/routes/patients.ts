import express from "express";
import patientsService from "../services/patientsService";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

// router.get("/", (_req, res) => {
//   res.send(patientsService.getPatients());
// });

router.post("/", (req, res) => {
  // const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedPatient = patientsService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error " + error.message;
    }
    res.status(400).send(errorMessage);
  }

  // const addedPatient = patientsService.addPatient({
  //   name,
  //   dateOfBirth,
  //   ssn,
  //   gender,
  //   occupation,
  // });
  // res.json(addedPatient);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
    res.send(patientsService.getNonSensitivePatient(id));
  } else {
    res.status(404).send("Patient not found");
  }
});

export default router;
