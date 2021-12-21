import { useContext } from "react";
import jwtDecode from "jwt-decode";

import { createNewUser, createNewAdmin } from "../api/auth";
import AuthContext from "./context";
import { deleteUserToken, storeUserToken, deleteAdminToken, storeAdminToken,} from "./storage";

const useAuth = () => {
  const { user, admin, setUser, setAdmin } = useContext(AuthContext);

  const userLogout = () => {
    setUser(null);
    deleteUserToken();
  };

  const userLogin = (authToken) => {
    setUser(jwtDecode(authToken));
    storeUserToken(authToken);
  };

  const userCreateAccount = async (userData) => {
    const response = await createNewUser(userData);
    return response;
  };
  const adminLogout = () => {
    setAdmin(null);
    deleteAdminToken();
  };

  const adminLogin = (authToken) => {
    setAdmin(jwtDecode(authToken));
    storeAdminToken(authToken);
  };

  const adminCreateAccount = async (adminData) => {
    const response = await createNewAdmin(adminData);
    return response;
  };

  return { user, admin, setAdmin, setUser, userLogout, userLogin, userCreateAccount, adminLogout, adminLogin, adminCreateAccount };
};

export default useAuth;
