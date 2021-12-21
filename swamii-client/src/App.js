import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import AuthContext from "./auth/context";
import { getUserFromToken, getAdminFromToken } from "./auth/storage";
import AppNavigation from "./navigation/AppNavigation";

function App() {
  const [user, setUser] = useState();
  const [admin, setAdmin] = useState();

  const restoreUser = async () => {
    const thisUser = await getUserFromToken();
    if (thisUser) {
      console.log("restored User");
      return setUser(thisUser);
    }
    setUser(null);
  };
  const restoreAdmin = async () => {
    const thisAdmin = await getAdminFromToken();
    if (thisAdmin) {
      console.log("restored Admin");
      return setAdmin(thisAdmin);
    }
    setAdmin(null);
  };

  useEffect(() => {
    restoreUser();
    restoreAdmin();
  }, []);


  return (
    <AuthContext.Provider value={{ user, admin, setUser, setAdmin }}>
      <BrowserRouter>
        <AppNavigation/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
