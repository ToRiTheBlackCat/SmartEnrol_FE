import React from 'react';

interface ChatSession {
  id: number;
  user: string;
  startTime: string;
  duration: string;
  messages: number;
  satisfaction: number;
}

const ChatManagement: React.FC = () => {
  const chatSessions: ChatSession[] = [
    {
      id: 1,
      user: "Nguyễn Văn A",
      startTime: "2024-03-15 14:30",
      duration: "15 phút",
      messages: 12,
      satisfaction: 4.5
    },
    // Thêm data mẫu
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Quản lý Chat</h1>
        <div className="flex space-x-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            Xuất báo cáo
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Cài đặt AI
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Tổng cuộc hội thoại</h3>
          <p className="text-3xl font-semibold mt-2">1,234</p>
          <span className="text-green-500 text-sm">↑ 12% so với hôm qua</span>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Thời gian TB</h3>
          <p className="text-3xl font-semibold mt-2">8.5 phút</p>
          <span className="text-red-500 text-sm">↓ 5% so với hôm qua</span>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Độ hài lòng</h3>
          <p className="text-3xl font-semibold mt-2">4.8/5</p>
          <span className="text-green-500 text-sm">↑ 2% so với hôm qua</span>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Tỷ lệ giải quyết</h3>
          <p className="text-3xl font-semibold mt-2">95%</p>
          <span className="text-green-500 text-sm">↑ 3% so với hôm qua</span>
        </div>
      </div>

      {/* Chat Sessions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Người dùng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thời gian bắt đầu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thời lượng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số tin nhắn
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Đánh giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {chatSessions.map((session) => (
              <tr key={session.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  #{session.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{session.user}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {session.startTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {session.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {session.messages}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900">{session.satisfaction}</span>
                    <span className="ml-2 text-yellow-400">★</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Xem</button>
                  <button className="text-red-600 hover:text-red-900">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChatManagement; 