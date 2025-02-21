import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Service/api';
import { toast } from 'react-toastify';
import { HiMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import Background from '../assets/Login.jpg';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { signupAPI } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    accountName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp!');
      return;
    }

    try {
      setIsLoading(true);
      const response = await signupAPI(
        formData.accountName,
        formData.email,
        formData.password
      );

      if (response && response.result === "Account created successfully!") {
        toast.success('Đăng ký thành công!');
        navigate('/login');
      } else {
        toast.error('Đăng ký thất bại. Vui lòng thử lại!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8" 
         style={{ backgroundImage: `url(${Background})` }}>
      <div className="max-w-md w-full bg-gray-900 bg-opacity-80 p-8 rounded-2xl shadow-2xl space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Tạo tài khoản mới
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Hoặc{' '}
            <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300">
              đăng nhập nếu đã có tài khoản
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="relative">
              <label htmlFor="accountName" className="sr-only">Tên tài khoản</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaRegUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="accountName"
                name="accountName"
                type="text"
                required
                value={formData.accountName}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-600 placeholder-gray-400 text-white rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                placeholder="Tên tài khoản"
              />
            </div>

            <div className="relative">
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-600 placeholder-gray-400 text-white rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                placeholder="Địa chỉ email"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="sr-only">Mật khẩu</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <RiLockPasswordLine className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-600 placeholder-gray-400 text-white rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                placeholder="Mật khẩu"
              />
            </div>

            <div className="relative">
              <label htmlFor="confirmPassword" className="sr-only">Xác nhận mật khẩu</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <RiLockPasswordLine className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-600 placeholder-gray-400 text-white rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                placeholder="Xác nhận mật khẩu"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                isLoading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Đang xử lý...
                </>
              ) : 'Đăng ký'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link to="/" className="text-sm font-medium text-blue-400 hover:text-blue-300">
            Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 