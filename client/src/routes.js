import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react'; // Import Clerk's useUser hook
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import SensorPage from './pages/SensorPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import SignupPage from './pages/SignupPage';


export default function Router() {
  const user = useUser(); // Get user data from Clerk
 
  return (
    <Routes>
      <Route path='/sign-up' element={<SignupPage/>}/>
      <Route path="/dashboard" element={user.isSignedIn ? <DashboardLayout /> : <Navigate to="/sign-in" />}>
        <Route index element={<Navigate to="app" />} />
        <Route path="app" element={<DashboardAppPage />} />
        <Route path="sensor" element={<SensorPage />} />
      </Route>
      <Route path="/sign-in" element={!user.isSignedIn ? <LoginPage /> : <Navigate to="/dashboard/app" />} />
      <Route
        element={!user ? <SimpleLayout /> : <Navigate to="/dashboard/app" />} // Redirect unauthenticated users
      >
        <Route index element={<Navigate to="/dashboard/app" />} />
        <Route path="404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}
