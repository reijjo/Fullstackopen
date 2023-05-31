import { Diary } from "./types";
import diaryService from "./diaryService";

import { useEffect, useState } from "react";

const App = () => {
  const [newDiary, setNewDiary] = useState("");
  const [diaries, setDiaries] = useState<Diary[]>([
    // {
    //   id: 1,
    //   date: "2017-04-01",
    //   weather: "sunny",
    //   visibility: "good",
    //   comment: "all good!",
    // },
  ]);

  useEffect(() => {
    diaryService.getAllDiaries().then((data) => {
      console.log("data", data);
      setDiaries(data);
    });
  }, []);

  return (
    <>
      <h2>Add new entry</h2>

      <h2>Diary entries</h2>

      {diaries.map((trip) => (
        <div key={trip.id}>
          <h2>{trip.date}</h2>
          <div>visibility: {trip.visibility}</div>
          <div>weather: {trip.weather}</div>
        </div>
      ))}
    </>
  );
};

export default App;
