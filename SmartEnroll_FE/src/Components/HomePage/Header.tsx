import React from "react";
import '../../tailwind.css'; 
import Logo from '../../assets/LOGO/4-removebg-preview.png'
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="w-full h-30 flex items-center justify-between px-10 py-4 bg-white shadow-md">
      <div className="flex items-center">
        <img src={Logo} alt="Logo" className="h-26 w-26 mr-2" />
        <span className="text-xl font-bold text-[#2860ab]">Smart Enrol</span>
      </div>
      <nav className="space-x-6 text-[#2860ab] font-medium">
        <Link to="/" className="hover:text-blue-600">Trang chủ</Link>
        <div className="relative inline-block group">
          <button className="hover:text-blue-600">
            AI Services
            <svg className="w-4 h-4 ml-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg rounded-lg mt-2 py-2 z-50">
            <Link to="/chatbot" className="block px-4 py-2 hover:bg-gray-100">
              <div className="flex items-center">
                <span className="w-8">🤖</span>
                AI Chatbot
              </div>
            </Link>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              <div className="flex items-center">
                <span className="w-8">📝</span>
                Tư vấn tuyển sinh AI
              </div>
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              <div className="flex items-center">
                <span className="w-8">🎯</span>
                Phân tích ngành học
              </div>
            </a>
          </div>
        </div>
        <a href="#" className="hover:text-blue-600">Tài liệu</a>
        <a href="#" className="hover:text-blue-600">Tuyển sinh</a>
        <a href="#" className="hover:text-blue-600">Hướng nghiệp</a>
        <a href="#" className="hover:text-blue-600">Về chúng tôi</a>
      </nav>
      <div className="flex items-center space-x-4">
        <Link to="/chatbot" className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
          <div className="flex items-center">
            <span className="mr-2">🤖</span>
            Chat với AI
          </div>
        </Link>
        <Link to="/login" className="bg-[#2860ab] text-white px-6 py-3 rounded-lg font-bold flex items-center hover:bg-blue-700 transition-colors">
          Đăng nhập
        </Link>
      </div>
    </header>
  );
};

export default Header;