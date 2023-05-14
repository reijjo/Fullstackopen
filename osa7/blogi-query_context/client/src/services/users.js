import axios from "axios";

const baseUrl = "http://localhost:3003/api/users";

const allUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const oneUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const userService = { allUsers, oneUser };

export default userService;
