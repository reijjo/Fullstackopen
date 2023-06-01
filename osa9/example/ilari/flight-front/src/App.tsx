import { Diary, Weather, Visibility } from "./types";
import diaryService from "./diaryService";

import { useEffect, useState } from "react";

import Notify from "./components/Notify";

const App = () => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [diaries, setDiaries] = useState<Diary[]>([]);

  const [errorMessage, setErrorMessage] = useState("");

  const VisibilityOptions = Object.values(Visibility);
  const WeatherOptions = Object.values(Weather);

  useEffect(() => {
    diaryService.getAllDiaries().then((data) => {
      console.log("data", data);
      setDiaries(data);
    });
  }, []);

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const diaryObj = {
        date: date,
        visibility: visibility,
        weather: weather,
        comment: comment,
      };
      console.log("new diary", diaryObj);
      await diaryService.createDiary(diaryObj).then((data) => {
        console.log("Post data", data);
        setDiaries(diaries.concat(data));
      });
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "response" in error) {
        const errorResponse = (error as { response: { data: string } }).response
          .data;
        console.log("haloo", errorResponse);
        setErrorMessage(String(errorResponse));
        setTimeout(() => {
          setErrorMessage("");
        }, 6000);
      }
    }

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  console.log("Weather", weather);

  return (
    <>
      <h2>Add new entry</h2>
      <Notify message={errorMessage} />
      <form onSubmit={diaryCreation}>
        <div>
          date{" "}
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility{" "}
          {VisibilityOptions.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                name="visibility"
                value={option}
                onChange={(event) => setVisibility(event.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
        <div>
          weather{" "}
          {WeatherOptions.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                name="weather"
                value={option}
                onChange={(event) => setWeather(event.target.value)}
              />
              {option}
            </label>
          ))}
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
