import React from "react";
import Header from "../Components/HomePage/Header";
import image from "../assets/CareerGuidance.png";

const CareerGuidancePage: React.FC = () => {
  return (
    <>
    <Header/>
    <div className="mt-20 min-h-screen bg-gradient-to-b from-pink-100 to-purple-500 p-6">
      {/* Main Content */}
      <div className="max-w-5xl mx-auto flex">
        {/* Left Content */}
        <div className="flex-1 pr-6">
          <h1 className="font-bold text-black text-5xl  mb-4">
            Chỉ với những thông tin về bản thân bạn, bạn sẽ có câu trả lời
          </h1>
          <p className="text-gray-600 text-3xl mb-6">
            Khám phá bản thân với những thông tin về cá tính của bạn và bạn sẽ biết
            được chính xác mình phù hợp với con đường nào. Chúng tôi sẽ đưa ra những
            kết quả chi tiết để qua đó giúp bạn tham khảo và chọn ra con đường cho tương lai.
          </p>

          {/* Buttons */}
          <div className="flex justify-center space-x-6 mb-6">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">
                Tìm hiểu thêm
            </button>
            <button className="px-6 py-3 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition">
                Thử ngay
            </button>
          </div>
        </div>

        {/* Right Content (Image) */}
        <div className="flex justify-center items-center w-1/3">
          <img src={image} alt="Hình minh họa" className="w-full rounded-lg" />
        </div>
      </div>

      {/* Steps Section */}
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold text-black mb-4">Cách hoạt động</h2>
        <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-yellow-300 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">01</h3>
            <p className="text-gray-700">Nhập tính cách của bạn</p>
          </div>
          <div className="bg-green-300 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">02</h3>
            <p className="text-gray-700">Định hướng nghề nghiệp</p>
          </div>
          <div className="bg-cyan-300 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">03</h3>
            <p className="text-gray-700">Hướng nghiệp cho bạn <span className="font-semibold">Kết quả</span></p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CareerGuidancePage;
