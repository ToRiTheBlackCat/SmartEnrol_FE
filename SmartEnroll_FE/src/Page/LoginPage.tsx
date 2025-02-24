import Background from '../assets/Login.jpg';
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../Utils/firebase";
import {useAuth, googleLoginAPI, viewUserInfo} from '../Service/api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUserRedux } from '../Store/authSlice';
import store from '../Store/store';
const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { loginAPI } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      setIsLoading(true);
      const response = await loginAPI(formData.email, formData.password);
      
      console.log('Login Response:', response);

      if (response && response.token && response.accountId) {
        const userData = {
          token: response.token,
          accountId: response.accountId,
          accountName: response.accountName || formData.email.split('@')[0],
          email: response.email || formData.email
        };

        console.log('Dispatching to Redux:', userData);
        dispatch(setUserRedux(userData));

        toast.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        console.error('Invalid response data:', response);
        toast.error("Thông tin đăng nhập không chính xác");
      }
    } catch (error: any) {
      console.error('Login Error:', error);
      toast.error(error.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      const name = result.user.displayName;

      if (!email || !name) {
        toast.error("Không thể lấy thông tin từ Google");
        return;
      }

      const response = await googleLoginAPI(email, name);
      if (response) {
        dispatch(setUserRedux({
          token: response.token,
          accountId: response.accountId,
          accountName: response.accountName || name,
          email: response.email || email
        }));
        toast.success(`Chào mừng, ${name}`);
        navigate("/");
      }
    } catch (error) {
      toast.error("Đăng nhập bằng Google thất bại");
      console.error("Error signing in with Google:", error);
    }
  };

  const handleLoginBasic = async () => {
    const loggedInUser = await loginAPI(formData.email, formData.password);
    if(loggedInUser){
      
      const userId = store.getState().auth.accountId;
      if(userId==null){
        return
      }
      const userData = await viewUserInfo(userId)
      const userName = userData.accountName;
      const userEmail = userData.email;
      dispatch(setUserRedux({token: loggedInUser.token, accountId: loggedInUser.accountId, accountName: userName, email: userEmail }));
      toast.success(`Welcome, ${userName}`, {position: "top-right"});
      // console.log(User);
      navigate(`/`);
    }else{
      toast.error("Login failed", { position: "top-right" });
    }
  }
  return (
    <div className="h-screen w-full flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${Background})` }}>
      <div className="bg-gray-900 bg-opacity-80 p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-white text-2xl font-bold text-center mb-6">Log in</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="name@example.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <a href='/forgot-password' className="hover:underline">Forgot password?</a>
            </div>
          </div>

          <button 
            type="submit"
            onClick={handleLoginBasic}
            disabled={isLoading}
            className={`w-full py-2 text-white rounded-lg font-semibold ${
              isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full py-2 bg-gray-100 border rounded-lg hover:bg-gray-300"
          >
            <FcGoogle className="w-6 h-6 mr-2" />
            Continue with Google
          </button>
        </div>

        <div className="text-center mt-4 text-gray-400">
          <p>Don't have an account? <a href='/register' className="text-blue-400 hover:underline">Create account</a></p>
        </div>
        <div className='text-center mt-0.5'>
          <a href='/' className='text-blue-400 hover:underline'>Back to home</a>
        </div>
      </div>
    </div>      
  );
};

export default Login;
