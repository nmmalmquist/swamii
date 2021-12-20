import axios from "axios";

const BASE_DOMAIN = "http://192.168.1.19:5000"

const getAllUsers = async () => {
  //must use IP Address, not localhost
  const url = `${BASE_DOMAIN}/api/users`;
  const response = await axios.get(url);
  const data = await response.data
  return data;
};
const getUser = async (username) => {
  //must use IP Address, not localhost
  const url = `${BASE_DOMAIN}/api/users/${username}`;
  const response = await axios.get(url);
  const data = await response.data
  return data;
};

export { getAllUsers, getUser };
