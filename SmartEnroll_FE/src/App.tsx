import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from "./Page/HomePage";
import Login from "./Page/LoginPage";
import ChatbotPage from "./Page/ChatbotPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/chatbot" element={<ChatbotPage/>} />
      </Routes>
    </Router>
      
    
  );
};

export default App;

