import axios from "axios";
import { Diary } from "./types";

const baseUrl = "http://localhost:3001/api/diaries";

const getAllDiaries = () => {
  return axios.get<Diary[]>(baseUrl).then((response) => response.data);
};

const diaryService = { getAllDiaries };

export default diaryService;
