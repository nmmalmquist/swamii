import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import AuthContext from "./auth/context";
import { getUserFromToken } from "./auth/storage";
import AuthNavigation from "./navigation/AuthNavigation";
import AppNavigation from "./navigation/AppNavigation";

function App() {
  const [user, setUser] = useState();

  const restoreUser = async () => {
    const thisUser = await getUserFromToken();
    if (thisUser) {
      console.log("restored User");
      return setUser(thisUser);
    }
    setUser(null);
  };

  useEffect(() => {
    restoreUser();
  }, []);


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <AppNavigation/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
