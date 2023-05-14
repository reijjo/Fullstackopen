import axios from "axios";

const baseUrl = "http://localhost:3003/api/blogs";
const loginUrl = "http://localhost:3003/api/login";

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

export const likeQueryBlog = (blogObject) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios
    .put(`${baseUrl}/${blogObject.id}`, blogObject, config)
    .then((res) => res.data);
};

export const deleteQueryBlog = (id) => {
  console.log("Axios id", id);
  const config = {
    headers: { Authorization: token },
  };
  return axios.delete(`${baseUrl}/${id}`, config);
};

export const queryLogin = (credentials) => axios.post(loginUrl, credentials);
