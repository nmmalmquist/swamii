import React from "react";
import { Routes, Route } from "react-router-dom";

import EntryScreen from "../screens/EntryScreen"
import LoginScreen from "../screens/LoginScreen"
import CreateAccountScreen from "../screens/CreateAccountScreen"

function AuthNavigation(props) {
  return (
    <Routes>
      <Route path="/entry" element={<EntryScreen/>} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<CreateAccountScreen />} />
    </Routes>
  );
}

export default AuthNavigation;
