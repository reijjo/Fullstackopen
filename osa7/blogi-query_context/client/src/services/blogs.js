import axios from "axios";
// const baseUrl = '/api/blogs'
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

// -- /API/BLOGS

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  if (response.status === 201) return response.data;
  else throw new Error(`Unexpected status: ${response.status}`);
};

// -- /API/BLOGS/ID

const getBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("BACKEND", id);
  const response = await axios.get(`${baseUrl}/${id}`, config);
  return response.data;
};

const updateBlog = async (id, updatedObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log("service", id);
  await axios.delete(`${baseUrl}/${id}`, config);
};

const newComment = async (id, comment) => {
  const res = await axios.post(`${baseUrl}/${id}/comments`, { comment });
  return res.data;
};

const getAllComments = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}/comments`);
  return res.data;
};

const blogService = {
  setToken,
  getAll,
  addBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  newComment,
  getAllComments,
};

export default blogService;
