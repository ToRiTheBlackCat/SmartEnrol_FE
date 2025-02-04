import React from "react";
import '../../tailwind.css'; 

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 text-center">
      <p>© 2025 Nền tảng tuyển sinh. All rights reserved.</p>
      <nav className="mt-4">
        <a href="#" className="mx-2 hover:text-blue-400">Trang chủ</a>
        <a href="#" className="mx-2 hover:text-blue-400">Tài liệu</a>
        <a href="#" className="mx-2 hover:text-blue-400">Tuyển sinh</a>
        <a href="#" className="mx-2 hover:text-blue-400">Hướng nghiệp</a>
        <a href="#" className="mx-2 hover:text-blue-400">Về chúng tôi</a>
      </nav>
    </footer>
  );
};

export default Footer;