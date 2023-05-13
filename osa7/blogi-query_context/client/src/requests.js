import axios from "axios";

const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

export const setQueryToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getQueryAll = () => axios.get(baseUrl).then((res) => res.data);

export const addQueryBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.post(baseUrl, blogObject, config).then((res) => res.data);
};
