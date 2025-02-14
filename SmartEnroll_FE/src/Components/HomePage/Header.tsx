import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Logo from "../../assets/LOGO/4-removebg-preview.png";

const Header: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItems = ["Trang chủ", "Chat with AI", "Tuyển sinh", "Hướng nghiệp", "About us"];

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    console.log(user?.photoURL)
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full h-30 flex items-center justify-between px-10 py-4 shadow-md">
      <div className="flex items-center">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-26 w-26 mr-2 cursor-pointer" />
        </Link>
        <span className="text-xl font-bold text-[#2860ab]">Smart Enrol</span>
      </div>
      <nav className="flex space-x-4">
        {menuItems.map((item) => (
          <Link
            key={item}
            to={item === "Trang chủ" ? "/" : `/${item.replace(/\s+/g, "-").toLowerCase()}`}
            className="px-4 py-2 rounded-lg font-medium text-[#2860ab] hover:text-blue-600"
          >
            {item}
          </Link>
        ))}
      </nav>
      {user ? (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className=" rounded-3xl flex items-center space-x-2 px-4 py-2 cursor-pointer hover:bg-gray-200"
          >
            <img src={user?.photoURL ?? "https://pixabay.com/vectors/user-avatar-user-icon-account-icon-6380868/"} 
                alt="Avatar" 
                className="w-10 h-10 rounded-full border-2 border-gray-300"/>
            <span className="text-[#2860ab] font-bold">{user.displayName}</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50 transition-all duration-200 ease-in-out transform scale-95 origin-top-right">
              <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login" className="bg-[#2860ab] text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700">
          Đăng nhập
        </Link>
      )}
    </header>
  );
};

export default Header;
