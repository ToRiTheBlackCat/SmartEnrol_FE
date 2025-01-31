import React from "react";
import Banner from "./Banner";
import '../../tailwind.css'; 

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="text-xl font-bold text-center mb-4">Logo</div>
      <nav className="space-x-6 hidden md:flex justify-center mb-4">
        <a href="#" className="hover:text-blue-600">Trang chủ</a>
        <a href="#" className="hover:text-blue-600">Tài liệu</a>
        <a href="#" className="hover:text-blue-600">Tuyển sinh</a>
        <a href="#" className="hover:text-blue-600">Hướng nghiệp</a>
        <a href="#" className="hover:text-blue-600">Về chúng tôi</a>
      </nav>
      <Banner />
    </header>
  );
};

export default Header;