import axios from "axios";

const BASE_DOMAIN = "http://10.122.137.60:5000";

const getAllUsers = async () => {
  //must use IP Address, not localhost
  const url = `${BASE_DOMAIN}/api/users`;
  const response = await axios.get(url);
  const data = await response.data;
  return data;
};
const getAllUsersOrderedByBalance = async () => {
  //must use IP Address, not localhost
  const url = `${BASE_DOMAIN}/api/users/active/ordered-by-balance`;
  const response = await axios.get(url);
  const data = await response.data;
  return data;
};
const getUser = async (username) => {
  //must use IP Address, not localhost
  const url = `${BASE_DOMAIN}/api/users/${username}`;
  const response = await axios.get(url);
  const data = await response.data;
  return data;
};

export { getAllUsers, getAllUsersOrderedByBalance, getUser };
