import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import WelcomePage from "../pages/WelcomePage";

// Function to check if the user is logged in
const isLoggedIn = () => {
  const loginData = JSON.parse(localStorage.getItem("loginDetails") || "{}");
  console.log("Login Data Here",loginData.token)
  return loginData?.token ? true : false; // Ensure valid token
};



// Private Route Component
const PrivateRoute = ({ element }: { element: React.ReactElement }) => {
  return isLoggedIn() ? element : <Navigate to="/" replace />;
};

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/welcome" element={<PrivateRoute element={<WelcomePage />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
