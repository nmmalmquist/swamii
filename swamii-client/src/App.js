import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Lottie from "lottie-react";

import AuthContext from "./auth/context";
import { getUserFromToken, getAdminFromToken } from "./auth/storage";
import AppNavigation from "./navigation/AppNavigation";
import loadingAnimation from "./assets/animations/loadingSquare.json";
import NeonLogo from "./components/NeonLogo";
import ChatBox from "./components/ChatBox";
import ChatBubble from "./components/ChatBubble";

function App() {
  const [user, setUser] = useState();
  const [admin, setAdmin] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = () => {
    const thisUser = getUserFromToken();
    if (thisUser) {
      console.log("restored User");
      return setUser(thisUser);
    }
    setUser(null);
  };
  const restoreAdmin = () => {
    const thisAdmin = getAdminFromToken();
    if (thisAdmin) {
      console.log("restored Admin");
      return setAdmin(thisAdmin);
    }
    setAdmin(null);
  };

  useEffect(() => {
    restoreUser();
    restoreAdmin();
    setIsReady(true);
  }, []);

  //This is a splash screen for the time where we restore the user and admin. Not having this with render the navigation when the user/admin has not been restored, so on refresh, the screen will always revert to /entry or /admin/login
  if (!isReady) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Lottie style={{ width: 250 }} animationData={loadingAnimation} />
        <h6 style={{ fontSize: 50 }}>Loading...</h6>
      </div>
    );
  }
  return (
    <AuthContext.Provider value={{ user, admin, setUser, setAdmin }}>
      {/* <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", backgroundColor: "gray", height: "100vh", width: "700px"}}>
      <ChatBox/>
      </div> */}
      <BrowserRouter>
        <AppNavigation />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
