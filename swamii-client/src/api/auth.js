import axios from "axios";

const BASE_DOMAIN = "http://10.122.184.173:5000";

const validateUser = async ({ username, password }) => {
  const url = `${BASE_DOMAIN}/api/auth/user/login`;

  const response = await axios.post(url, {
    username: username,
    password: password,
  });

  if (typeof response.data === "object") {
    if ("errorState" in response.data) {
      throw new Error(JSON.stringify(response.data));
    }
  }
  return response.data;
};
const validateAdmin = async ({ username, password }) => {
  const url = `${BASE_DOMAIN}/api/auth/admin/login`;

  const response = await axios.post(url, {
    username: username,
    password: password,
  });

  if (typeof response.data === "object") {
    if ("errorState" in response.data) {
      throw new Error(JSON.stringify(response.data));
    }
  }
  return response.data;
};

const createNewUser = async ({
  firstName,
  lastName,
  email,
  username,
  password,
}) => {
  const url = `${BASE_DOMAIN}/api/auth/user/register`;

  const response = await axios.post(url, {
    firstName: firstName.toLowerCase(),
    lastName: lastName.toLowerCase(),
    email: email.toLowerCase(),
    username: username.toLowerCase(),
    password: password,
  });
  if (typeof response.data === "object") {
    if ("errorState" in response.data) {
      console.log("Could not Create account. Error in system");
      throw JSON.stringify(response.data);
    }
  }

  return response.data;
};
const createNewAdmin = async ({
  firstName,
  lastName,
  email,
  username,
  password,
}) => {
  const url = `${BASE_DOMAIN}/api/auth/admin/register`;

  const response = await axios.post(url, {
    firstName: firstName.toLowerCase(),
    lastName: lastName.toLowerCase(),
    email: email.toLowerCase(),
    username: username.toLowerCase(),
    password: password,
  });
  if (typeof response.data === "object") {
    if ("errorState" in response.data) {
      console.log("Could not Create account. Error in system");
      throw JSON.stringify(response.data);
    }
  }

  return response.data;
};

export { validateUser, validateAdmin, createNewUser, createNewAdmin };
