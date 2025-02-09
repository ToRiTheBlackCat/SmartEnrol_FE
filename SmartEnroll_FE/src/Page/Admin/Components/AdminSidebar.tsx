import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../../assets/LOGO/1.png';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/admin/users', icon: '👥', label: 'Quản lý người dùng' },
    { path: '/admin/chat', icon: '💬', label: 'Quản lý chat' },
    { path: '/admin/settings', icon: '⚙️', label: 'Cài đặt' },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      {/* Logo */}
      <div className="p-4">
        <img src={Logo} alt="Logo" className="h-8" />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-2 py-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-2 mt-2 text-sm rounded-lg ${
              location.pathname === item.path
                ? 'bg-gray-700 text-white'
                : 'hover:bg-gray-700'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-500 mr-3"></div>
          <div>
            <p className="text-sm font-medium">Admin Name</p>
            <p className="text-xs text-gray-400">admin@smartenrol.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar; 