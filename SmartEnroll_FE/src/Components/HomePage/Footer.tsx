import React from "react";
import '../../tailwind.css'; 

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 text-center">
      <nav className="mt-4">
        <a href="/" className="mx-2 hover:text-blue-400">Trang chủ</a>
        <a href="/career-guidance" className="mx-2 hover:text-blue-400">Hướng nghiệp</a>
        <a href="/about-us" className="mx-2 hover:text-blue-400">Về chúng tôi</a>
      </nav>
      <p>© Copyright 2025 | Smart Enrol | All Rights Reserved</p>
    </footer>
  );
};

export default Footer;