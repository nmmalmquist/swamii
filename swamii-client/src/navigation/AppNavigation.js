import React from "react";
import { Routes, Route } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";
import HomeScreen from "../screens/HomeScreen";
import EntryScreen from "../screens/EntryScreen";
import LoginScreen from "../screens/LoginScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import AdminLoginScreen from "../screens/AdminLoginScreen";
import AdminHomeScreen from "../screens/AdminHomeScreen";

function AppNavigation(props) {
  return (
    <Routes>
      <Route exact path="/" element={<PrivateRoute type="user" />}>
        <Route exact path="/" element={<HomeScreen />} />
      </Route>
      <Route path="/entry" element={<EntryScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<CreateAccountScreen />} />

      <Route path="/admin/login" element={<AdminLoginScreen />} />
      <Route exact path="/admin/home" element={<PrivateRoute type="admin" />}>
        <Route exact path="/admin/home" element={<AdminHomeScreen />} />
      </Route>
    </Routes>
  );
}

export default AppNavigation;
