import React from "react";
import '../../tailwind.css'; 

const Body: React.FC = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="text-center py-12 bg-blue-100">
        <h1 className="text-3xl font-bold">Nền tảng hướng dẫn tuyển sinh đại học</h1>
        <p className="mt-2 text-gray-700">Giúp học sinh tiếp cận cơ hội học tập tốt nhất</p>
      </section>

      {/* Features Section */}
      <section className="py-12 px-6 grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg">Tuyển sinh chatbot</h3>
          <p className="text-gray-600 mt-2">Hỗ trợ học sinh tìm kiếm phương thức tuyển sinh phù hợp.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg">Quy chế tuyển sinh</h3>
          <p className="text-gray-600 mt-2">Cập nhật quy chế tuyển sinh các trường đại học tại Việt Nam.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg">Đánh giá AI</h3>
          <p className="text-gray-600 mt-2">Phân tích điểm số và đề xuất trường đại học phù hợp.</p>
        </div>
      </section>

      <section className="bg-blue-50 py-12 text-center">
        <h2 className="text-2xl font-bold">Tại sao chọn chúng tôi?</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-6 px-6">
          <div className="bg-white p-6 rounded-lg shadow-md">Hàng ngàn học sinh đã sử dụng</div>
          <div className="bg-white p-6 rounded-lg shadow-md">Thông tin chính xác, cập nhật liên tục</div>
          <div className="bg-white p-6 rounded-lg shadow-md">Công nghệ AI hỗ trợ hiệu quả</div>
        </div>
      </section>
    </main>
  );
};

export default Body;