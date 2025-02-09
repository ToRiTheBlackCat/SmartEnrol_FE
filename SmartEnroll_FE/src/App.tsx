import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from "./Page/HomePage";
import Login from "./Page/LoginPage";
import ChatbotPage from "./Page/ChatbotPage";
import AdminLayout from "./Page/Admin/AdminLayout";
import Dashboard from "./Page/Admin/Pages/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/chatbot" element={<ChatbotPage/>} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          {/* Add more admin routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

