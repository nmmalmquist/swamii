import React from "react";
import { Routes, Route } from "react-router-dom";

import HomeScreen from "../screens/HomeScreen";

import EntryScreen from "../screens/EntryScreen";
import LoginScreen from "../screens/LoginScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import { PrivateRoute } from "./PrivateRoute";

function AppNavigation(props) {
  return (
    <Routes>
      <Route exact path="/" element={<PrivateRoute/>} >
        <Route exact path="/" element={<HomeScreen/>}/>
      </Route>
      <Route path="/entry" element={<EntryScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<CreateAccountScreen />} />
    </Routes>
  );
}

export default AppNavigation;
