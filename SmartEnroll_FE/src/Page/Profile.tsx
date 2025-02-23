import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store/store";
import { updateProfileAPI, viewUserInfo } from "../Service/api";
import { toast } from "react-toastify";
import { updateUserInfo } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiUser, FiMail, FiActivity, FiSettings } from "react-icons/fi";
import { BiTime } from "react-icons/bi";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userToken = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.auth.accountId);
  const userEmail = useSelector((state: RootState) => state.auth.email);
  const userAccountName = useSelector((state: RootState) => state.auth.accountName);

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    accountName: "",
    email: "",
  });
  const [editForm, setEditForm] = useState({
    accountName: "",
    email: "",
  });

  useEffect(() => {
    if (!userToken || !userId) {
      toast.error("Vui lòng đăng nhập để xem thông tin");
      navigate("/login");
      return;
    }

    if (userAccountName && userEmail) {
      setUserInfo({
        accountName: userAccountName,
        email: userEmail,
      });
      setEditForm({
        accountName: userAccountName,
        email: userEmail,
      });
    } else {
      fetchUserInfo();
    }
  }, [userId, userToken, userAccountName, userEmail, navigate]);

  const fetchUserInfo = async () => {
    try {
      const data = await viewUserInfo(userId!);
      const newUserInfo = {
        accountName: data.accountName,
        email: data.email,
      };
      setUserInfo(newUserInfo);
      setEditForm(newUserInfo);
      dispatch(updateUserInfo(newUserInfo));
    } catch (error) {
      toast.error("Không thể tải thông tin người dùng");
      navigate("/login");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
      accountName: userInfo.accountName,
      email: userInfo.email,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !userToken) {
      toast.error("Vui lòng đăng nhập lại");
      navigate("/login");
      return;
    }

    try {
      setIsLoading(true);
      const response = await updateProfileAPI(
        userId,
        editForm.accountName,
        editForm.email,
        userToken
      );

      if (response) {
        dispatch(updateUserInfo({
          accountName: editForm.accountName,
          email: editForm.email
        }));
        setUserInfo(editForm);
        setIsEditing(false);
        toast.success("Cập nhật thông tin thành công!");
      }
    } catch (error: any) {
      if (error.message.includes("Phiên đăng nhập hết hạn")) {
        toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
        navigate("/login");
      } else {
        toast.error(error.message || "Cập nhật thất bại");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderProfileContent = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Thông tin cá nhân</h2>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <FiEdit2 className="w-4 h-4" />
            <span>Chỉnh sửa</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên tài khoản
            </label>
            <input
              type="text"
              name="accountName"
              value={editForm.accountName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={editForm.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
                isLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <FiUser className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tên tài khoản</p>
              <p className="text-base font-medium text-gray-900">{userInfo.accountName}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <FiMail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-base font-medium text-gray-900">{userInfo.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderActivityContent = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Hoạt động gần đây</h2>
      <div className="space-y-6">
        {/* Activity items */}
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <BiTime className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Đăng nhập thành công</p>
            <p className="text-sm text-gray-500">2 giờ trước</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <FiActivity className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Cập nhật thông tin cá nhân</p>
            <p className="text-sm text-gray-500">3 ngày trước</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsContent = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Cài đặt</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <FiSettings className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">Thông báo qua email</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {userInfo.accountName?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{userInfo.accountName}</h1>
              <p className="text-gray-600">{userInfo.email}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6 bg-white rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'profile'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FiUser className="w-4 h-4" />
            Thông tin
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'activity'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FiActivity className="w-4 h-4" />
            Hoạt động
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'settings'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FiSettings className="w-4 h-4" />
            Cài đặt
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'profile' && renderProfileContent()}
          {activeTab === 'activity' && renderActivityContent()}
          {activeTab === 'settings' && renderSettingsContent()}
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
