import { Diary } from "./types";
import diaryService from "./diaryService";

import { useEffect, useState } from "react";

const App = () => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
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

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    diaryService
      .createDiary({
        date: date,
        visibility: visibility,
        weather: weather,
        comment: comment,
      })
      .then((data) => {
        setDiaries(diaries.concat(data));
      });
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
        <div>
          date{" "}
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility{" "}
          <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          weather{" "}
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          comment{" "}
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Diary entries</h2>

      {diaries.map((trip) => (
        <div key={trip.id}>
          <h2>{trip.date}</h2>
          <div>visibility: {trip.visibility}</div>
          <div>weather: {trip.weather}</div>
          {trip.comment ? <div>- {trip.comment}</div> : null}
        </div>
      ))}
    </>
  );
};

export default App;
