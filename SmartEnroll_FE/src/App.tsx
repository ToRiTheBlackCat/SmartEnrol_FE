import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Homepage from "./Page/HomePage";
import Login from "./Page/LoginPage";
import ForgotPassword from "./Page/ChangePassword/ForgotPassword";
import VerifyCode from "./Page/ChangePassword/VerifyCode";
import SetNewPassword from "./Page/ChangePassword/SetNewPassword";
import ChatbotPage from "./Page/ChatbotPage";
import AdminLayout from "./Page/Admin/AdminLayout";
import Dashboard from "./Page/Admin/Pages/Dashboard";
import AboutUs from "./Page/AboutUs";
import Profile from "./Page/Profile";

const App: React.FC = () => {
  return (
    <>
    <ToastContainer autoClose={3000} />
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/chat-with-ai" element={<ChatbotPage/>} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          {/* Add more admin routes as needed */}
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/verify-code" element={<VerifyCode/>}/>
        <Route path="/set-new-password" element={<SetNewPassword/>}/>
        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </Router>
    </>
  );
};

export default App;

