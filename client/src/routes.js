import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {UserProfile, useUser } from "@clerk/clerk-react"; // Import Clerk's useUser hook
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
import SensorPage from "./pages/SensorPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import DashboardAppPage from "./pages/DashboardAppPage";
import SignupPage from "./pages/SignupPage";

export default function Router() {
  const { isSignedIn } = useUser(); // Get user data from Clerk

  return (
    <Routes>
      <Route path="/sign-up" element={<SignupPage />} />
      <Route path="/sign-in" element={<LoginPage/>} />
      {
        isSignedIn ?<Route
        path="/dashboard"
        element={ <DashboardLayout /> }
      >
        <Route index element={<Navigate to="app" />} />
        <Route path="app" element={<DashboardAppPage />} />
        <Route path="sensor" element={<SensorPage />} />
        <Route path="user" element={<UserProfile />} />
      </Route>:
      <Navigate to="sign-in" />
      }
      
      <Route
        element={
          isSignedIn ? <SimpleLayout /> : <Navigate to="/dashboard/app" />
        } 
      >
        <Route index element={<Navigate to="/dashboard/app" />} />
        <Route path="404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}
