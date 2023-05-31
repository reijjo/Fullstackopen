import axios from "axios";
import { Diary, NewDiary } from "./types";

const baseUrl = "http://localhost:3001/api/diaries";

const getAllDiaries = () => {
  return axios.get<Diary[]>(baseUrl).then((response) => response.data);
};

const createDiary = (object: NewDiary) => {
  return axios.post<Diary>(baseUrl, object).then((response) => response.data);
};

const diaryService = { getAllDiaries, createDiary };

export default diaryService;
