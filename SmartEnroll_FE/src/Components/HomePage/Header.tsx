import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store/store';
import { logout } from '../../Store/authSlice';
import { toast } from 'react-toastify';
import Logo from '../../assets/LOGO/1.png';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { 
  FiUser, FiMenu, FiX, FiHome, FiMessageSquare, 
  FiBook, FiCompass, FiInfo, FiChevronDown 
} from 'react-icons/fi';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);
  const userAccountName = useSelector((state: RootState) => state.auth.accountName);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Đăng xuất thành công!');
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: '/', label: 'Trang chủ', icon: FiHome },
    { path: '/chat-with-ai', label: 'Chat with AI', icon: FiMessageSquare },
    { path: '/tuyển-sinh', label: 'Tuyển sinh', icon: FiBook },
    { path: '/career-guidance', label: 'Hướng nghiệp', icon: FiCompass },
    { path: '/about-us', label: 'About Us', icon: FiInfo },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-white'
      }`}
    >
      <nav className="container mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center gap-2">
              <img src={Logo} alt="Logo" className="h-10 w-auto" />
              <span className="text-blue-700 font-bold text-xl tracking-wide">Smart Enrol</span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      isActiveLink(item.path)
                        ? 'text-white bg-blue-600 shadow-md'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            {isAuthenticated ? (
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FiUser className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">{userAccountName}</span>
                  <FiChevronDown className="w-4 h-4" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={`${
                              active ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                            } flex items-center gap-2 px-4 py-2 text-sm`}
                          >
                            <FiUser className="w-4 h-4" />
                            Hồ sơ
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${
                              active ? 'bg-red-50 text-red-600' : 'text-red-500'
                            } flex w-full items-center gap-2 px-4 py-2 text-sm`}
                          >
                            <FiX className="w-4 h-4" />
                            Đăng xuất
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-6 py-2.5"
                  >
                    Đăng nhập
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="text-sm font-medium px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 
                      transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Đăng ký
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden py-4 border-t border-gray-100 overflow-hidden bg-white"
            >
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.path}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          isActiveLink(item.path)
                            ? 'text-white bg-blue-600'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
                
                {/* Auth Buttons - Mobile */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="pt-4 mt-4 border-t border-gray-100"
                >
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <motion.div whileHover={{ scale: 1.02, x: 5 }}>
                        <Link 
                          to="/profile" 
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                        >
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <FiUser className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="text-sm font-medium">{userAccountName}</span>
                        </Link>
                      </motion.div>
                      <motion.button
                        whileHover={{ scale: 1.02, x: 5 }}
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 
                          rounded-lg transition-all duration-300 text-left"
                      >
                        Đăng xuất
                      </motion.button>
                    </div>
                  ) : (
                    <div className="space-y-3 px-4">
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <Link
                          to="/login"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block w-full py-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 
                            rounded-lg transition-all duration-300 text-center"
                        >
                          Đăng nhập
                        </Link>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <Link
                          to="/register"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block w-full py-3 text-sm font-medium text-center bg-blue-600 text-white 
                            rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
                        >
                          Đăng ký
                        </Link>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
