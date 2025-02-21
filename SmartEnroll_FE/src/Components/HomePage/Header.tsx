import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store/store';
import { logout } from '../../Store/authSlice';
import { toast } from 'react-toastify';
import Logo from '../../assets/LOGO/1.png';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);
  const userAccountName = useSelector((state: RootState) => state.auth.accountName);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Đăng xuất thành công!');
    navigate('/');
  };

  return (
    <header className="bg-gray-900 text-white">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={Logo} alt="Logo" className="h-8 w-auto mr-2" />
              <span className="text-xl font-bold">Smart Enrol</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-blue-400">Trang chủ</Link>
            <Link to="/chat-with-ai" className="hover:text-blue-400">Chat with AI</Link>
            <Link to="/tuyển-sinh" className="hover:text-blue-400">Tuyển sinh</Link>
            <Link to="/hướng-nghiệp" className="hover:text-blue-400">Hướng nghiệp</Link>
            <Link to="/about-us" className="hover:text-blue-400">About Us</Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="hover:text-blue-400">
                  {userAccountName || 'Tài khoản'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
