import jwtDecode from "jwt-decode";

const KEY = "swamiiAuthToken";

const storeToken = (authToken) => {
    console.log("store: " + authToken)
    try {
        window.localStorage.setItem(KEY, authToken);
    } catch (error) {
        console.log("error storing auth-token")
    }
};

const getToken = () => {
    try {
        return window.localStorage.getItem(KEY);
    } catch (error) {
        console.log("could not get auth-token")
    }
};

const getUserFromToken = () => {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  };

const deleteToken = () => {
    try {
        window.localStorage.removeItem(KEY);
    } catch (error) {
        console.log("could not delete auth-token")
    }
};

export {
    storeToken,
    getUserFromToken,
    deleteToken,
    getToken,
  };