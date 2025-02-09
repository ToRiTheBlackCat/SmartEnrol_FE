import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Tổng người dùng</h3>
          <p className="text-3xl font-semibold mt-2">1,234</p>
          <span className="text-green-500 text-sm">↑ 12% so với tháng trước</span>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Cuộc trò chuyện</h3>
          <p className="text-3xl font-semibold mt-2">5,678</p>
          <span className="text-green-500 text-sm">↑ 8% so với tháng trước</span>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Người dùng mới</h3>
          <p className="text-3xl font-semibold mt-2">145</p>
          <span className="text-green-500 text-sm">↑ 4% so với tháng trước</span>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Tỷ lệ hài lòng</h3>
          <p className="text-3xl font-semibold mt-2">92%</p>
          <span className="text-green-500 text-sm">↑ 2% so với tháng trước</span>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Hoạt động gần đây</h2>
        <div className="space-y-4">
          {/* Activity Items */}
          <div className="flex items-center p-4 border-b">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              👤
            </div>
            <div>
              <p className="font-medium">Người dùng mới đăng ký</p>
              <p className="text-sm text-gray-500">2 phút trước</p>
            </div>
          </div>
          {/* Add more activity items as needed */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 