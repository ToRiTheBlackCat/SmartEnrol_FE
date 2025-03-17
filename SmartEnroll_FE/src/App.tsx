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
import RegisterPage from "./Page/RegisterPage";
import AIFeaturesPage from "./Page/AIFeaturesPage";
import UserManagement from "./Page/Admin/Pages/UserManagement";
import ChatManagement from "./Page/Admin/Pages/ChatManagement";
import CareerGuidancePage from "./Page/CareerGuidancePage";
import HollandTest from "./Page/HollandTest";


const App: React.FC = () => {
  return (
    <>
    <ToastContainer autoClose={3000} />
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/chat-with-ai" element={<ChatbotPage/>} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/chatbot" element={<ChatbotPage/>} />
        <Route path="/ai-features" element={<AIFeaturesPage/>} />
        <Route path="/career-guidance" element={<CareerGuidancePage/>}/>
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="chat" element={<ChatManagement />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/verify-code" element={<VerifyCode/>}/>
        <Route path="/set-new-password" element={<SetNewPassword/>}/>
        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/holland-Test" element={<HollandTest/>}/>
      </Routes>
    </Router>
    </>
  );
};

export default App;

