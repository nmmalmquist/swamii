import jwtDecode from "jwt-decode";

const USER_KEY = "swamiiUserAuthToken";
const ADMIN_KEY = "swamiiAdminAuthToken";

const storeUserToken = (authToken) => {
    try {
        window.localStorage.setItem(USER_KEY, authToken);
    } catch (error) {
        console.log("error storing auth-token")
    }
};

const getUserToken = () => {
    try {
        return window.localStorage.getItem(USER_KEY);
    } catch (error) {
        console.log("could not get auth-token")
    }
};

const getUserFromToken = () => {
    const token = getUserToken();
    return token ? jwtDecode(token) : null;
  };

const deleteUserToken = () => {
    try {
        window.localStorage.removeItem(USER_KEY);
    } catch (error) {
        console.log("could not delete auth-token")
    }
};
const storeAdminToken = (authToken) => {
    try {
        window.sessionStorage.setItem(ADMIN_KEY, authToken);
    } catch (error) {
        console.log("error storing auth-token")
    }
};

const getAdminToken = () => {
    try {
        return window.sessionStorage.getItem(ADMIN_KEY);
    } catch (error) {
        console.log("could not get auth-token")
    }
};

const getAdminFromToken = () => {
    const token = getAdminToken();
    return token ? jwtDecode(token) : null;
  };

const deleteAdminToken = () => {
    try {
        window.sessionStorage.removeItem(ADMIN_KEY);
    } catch (error) {
        console.log("could not delete auth-token")
    }
};

export {
    storeUserToken,
    getUserFromToken,
    deleteUserToken,
    getUserToken,
    storeAdminToken,
    getAdminFromToken,
    deleteAdminToken,
    getAdminToken,
  };