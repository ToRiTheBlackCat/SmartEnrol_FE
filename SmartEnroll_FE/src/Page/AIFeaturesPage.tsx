import React from 'react';
import Header from '../Components/HomePage/Header';
import Footer from '../Components/HomePage/Footer';

const AIFeaturesPage: React.FC = () => {
  const features = [
    {
      icon: "🤖",
      title: "AI Chatbot",
      description: "Trả lời tức thì mọi câu hỏi về tuyển sinh và hướng nghiệp",
      link: "/chatbot"
    },
    {
      icon: "🎯",
      title: "Phân tích ngành học",
      description: "Sử dụng AI để phân tích và gợi ý ngành học phù hợp với năng lực",
      link: "#"
    },
    {
      icon: "📊",
      title: "Dự đoán điểm chuẩn",
      description: "Dự đoán điểm chuẩn dựa trên dữ liệu các năm trước",
      link: "#"
    },
    {
      icon: "📝",
      title: "Tư vấn tuyển sinh AI",
      description: "Tư vấn chi tiết về quy trình tuyển sinh và các yêu cầu đầu vào",
      link: "#"
    }
  ];

  return (
    <div>
      <Header />
      <main className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">AI Features</h1>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Khám phá các tính năng AI thông minh giúp bạn trong quá trình tuyển sinh và định hướng nghề nghiệp
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <a 
                  href={feature.link} 
                  className="inline-flex items-center text-blue-600 hover:text-blue-700"
                >
                  Khám phá ngay
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>

          {/* AI Stats Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Độ chính xác trong tư vấn</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Hỗ trợ liên tục</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Người dùng hài lòng</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIFeaturesPage; 