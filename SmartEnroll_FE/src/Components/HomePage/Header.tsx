import React from "react";
import '../../tailwind.css'; 
import Logo from '../../assets/LOGO/4-removebg-preview.png'

const Header: React.FC = () => {
  return (
    <header className="w-full h-30 flex items-center justify-between px-10 py-4 bg-white shadow-md">
      <div className="flex items-center">
        <img src={Logo} alt="Logo" className="h-26 w-26 mr-2" />
        <span className="text-xl font-bold text-[#2860ab]">Smart Enrol</span>
      </div>
      <nav className="space-x-6 text-[#2860ab]  font-medium">
        <a href="#" className="hover:text-blue-600">Trang chủ</a>
        <a href="#" className="hover:text-blue-600">Tài liệu</a>
        <a href="#" className="hover:text-blue-600">Tuyển sinh</a>
        <a href="#" className="hover:text-blue-600">Hướng nghiệp</a>
        <a href="#" className="hover:text-blue-600">Về chúng tôi</a>
      </nav>
      <a href="/login" className="bg-[#2860ab] text-white px-6 py-3 rounded-lg font-semibold flex items-center hover:bg-blue-700">
        Đăng nhập <span className="ml-2">➡️</span>
      </a>
    </header>
  );
};

export default Header;