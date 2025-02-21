import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store/store";
import { updateProfileAPI, viewUserInfo } from "../Service/api";
import { toast } from "react-toastify";
import { updateUserInfo } from "../Store/authSlice";
import { useNavigate } from "react-router-dom";


const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.auth.accountId);
  const userEmail = useSelector((state: RootState) => state.auth.email);
  const userAccountName = useSelector((state: RootState) => state.auth.accountName);
  const navigate = useNavigate();

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
      console.error('Update Profile Error:', error);
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="absolute -bottom-12 left-8">
            <img
              src="https://via.placeholder.com/120"
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-16 pb-8 px-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{userInfo.accountName}</h2>
              <p className="text-gray-600">{userInfo.email}</p>
            </div>
            {!isEditing ? (
              <button 
                onClick={handleEdit}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Chỉnh sửa
              </button>
            ) : (
              <div className="space-x-3">
                <button 
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Hủy
                </button>
                <button 
                  type="submit"
                  form="profile-form"
                  disabled={isLoading}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white transition-colors
                    ${isLoading 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Đang lưu...
                    </>
                  ) : 'Lưu thay đổi'}
                </button>
              </div>
            )}
          </div>

          {isEditing ? (
            <form id="profile-form" onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên tài khoản
                </label>
                <input
                  type="text"
                  name="accountName"
                  required
                  value={editForm.accountName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={editForm.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Tên tài khoản</h3>
                <p className="mt-2 text-base text-gray-900">{userInfo.accountName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-2 text-base text-gray-900">{userInfo.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
