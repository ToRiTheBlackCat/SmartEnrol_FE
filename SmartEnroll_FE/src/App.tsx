import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from "./Page/HomePage";
import Login from "./Page/LoginPage";
import ForgotPassword from "./Page/ChangePassword/ForgotPassword";
import VerifyCode from "./Page/ChangePassword/VerifyCode";
import SetNewPassword from "./Page/ChangePassword/SetNewPassword";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/verify-code" element={<VerifyCode/>}/>
        <Route path="/set-new-password" element={<SetNewPassword/>}/>
      </Routes>
    </Router>
      
    
  );
};

export default App;

