import Background from '../assets/Login.jpg';
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import { auth } from "../Utils/firebase";
import {useAuth, googleLoginAPI} from '../Service/api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginAPI, User, error } = useAuth(); 
  const navigate = useNavigate();

  const handleGoogleSignIn = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      const name = result.user.displayName;

      if (!email) {
        console.error("Email not found");
        return;
      }
      if (!name) {
        console.error("Name not found");
        return;
      }

      // Call backend API to register/login the user
      const response = await googleLoginAPI(email, name);
      console.log("Login successful:", response);

      console.log("User signed in:", result.user);
      toast.success("Logged in successfully!", { position: "top-right" });
      setUser(result.user);
      console.log(user)
      navigate("/");
    } catch (error) {
      toast.error("Error signing in with Google", { position: "top-right" });
      console.error("Error signing in with Google:", error);
    }
  };

  const handleLoginBasic = async () => {
    const loggedInUser = await loginAPI(email, password);
    if(loggedInUser){
      toast.success("Login successfully", {position: "top-right"});
      console.log(User);
      navigate(`/`);
    }else{
      toast.error(error || "Login failed", { position: "top-right" });
      console.log(error);
    }
  }
  return (
    <div className="h-screen w-full flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${Background})` }}>
      {/* Form đăng nhập */}
      <div className="bg-gray-900 bg-opacity-80 p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-white text-2xl font-bold text-center mb-6">Log in</h2>
        
        {/* Input Fields */}
        <div className="mb-4">
          <label className="block text-gray-300 text-sm mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="name@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 text-sm mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <a href='/forgot-password' className="hover:underline">Forgot password?</a>
          </div>
        </div>
        {/* Login Button */}
        <button 
        onClick={handleLoginBasic}
        className="w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600">Login</button>
        <div className="text-center mt-4">
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full py-2 bg-gray-100 border rounded-lg hover:bg-gray-300"
        >
          <FcGoogle className="w-6 h-6 mr-2" />
              Continue with Google
        </button>
        </div>
        {/* Create Account */}
        <div className="text-center mt-4 text-gray-400">
          <p>Don’t have an account? <a href='/register' className="text-blue-400 hover:underline">Create account</a></p>
        </div>
        <div className='text-center mt-0.5'>
          <a href='/' className='text-blue-400 hover:underline'>Back to home</a>
        </div>
      </div>
    </div>      
  )
};

export default Login;
