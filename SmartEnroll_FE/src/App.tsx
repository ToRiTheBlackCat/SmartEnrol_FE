import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from "./Page/HomePage";
import Login from "./Page/LoginPage";
import Register from "./Page/RegisterPage";
import ChatbotPage from "./Page/ChatbotPage";
import AdminLayout from "./Page/Admin/AdminLayout";
import Dashboard from "./Page/Admin/Pages/Dashboard";
import AIFeaturesPage from "./Page/AIFeaturesPage";
import UserManagement from "./Page/Admin/Pages/UserManagement";
import ChatManagement from "./Page/Admin/Pages/ChatManagement";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/chatbot" element={<ChatbotPage/>} />
        <Route path="/ai-features" element={<AIFeaturesPage/>} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="chat" element={<ChatManagement />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

