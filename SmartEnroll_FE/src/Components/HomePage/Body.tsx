import React, { useEffect } from "react";
import 'aos/dist/aos.css';
import AOS from 'aos';
import '../../tailwind.css'; 
import { ArcherContainer, ArcherElement } from "react-archer";
import AIPicture from '../../assets/AI.jpg';
import UniPicture from '../../assets/dai-hoc-fpt-tp-hcm-1.jpeg';
import Logo from '../../assets/LOGO/3.png';

const BodySection: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <ArcherContainer 
      strokeColor="rgba(125, 162, 206, 0.7)" 
      strokeWidth={3}
      endMarker={false}
      lineStyle="curve"
    >
      <div className="bg-pink-50 py-12 px-6">
        {/* Tiêu đề chính */}
        <h2 className="text-center text-2xl font-bold mb-8" data-aos="fade-up">
          Chúng tôi có gì
        </h2>

        {/* Nội dung chính */}
        <div className="flex flex-col items-center space-y-40" >
          
          {/* Hình ảnh chính và mô tả */}
          <div className="flex items-center space-x-30 " data-aos="fade-left">
            <ArcherElement
              id="main-description"
              relations={[{ targetId: "university-info", targetAnchor: "top", sourceAnchor: "bottom" }]}
            >
              <img src={Logo} alt="Logo" className="w-80 h-60 rounded-3xl" />
            </ArcherElement>
            <div className="bg-white-100 p-4 h-60 w-80 text-2xl">
              Tuyển sinh chatbot cung cấp công cụ trợ giúp toàn diện, giúp học sinh tiếp cận các phương thức tuyển sinh mới nhất của các trường đại học.
            </div>
          </div>

          {/* Nhánh trái */}
          <div className="flex items-center space-x-45 " data-aos="fade-right">
            <div className="bg-white-100 p-4 h-100 w-55 text-2xl">
              Nắm bắt rõ quy chế tuyển sinh của từng trường đại học tại Việt Nam
            </div>
            <ArcherElement 
              id="university-info"
              relations={[{ targetId: "ai-box", targetAnchor: "top", sourceAnchor: "bottom" }]}
            >
              <img src={UniPicture} alt="Hinh anh" className="w-90 h-60 rounded-4xl" />
            </ArcherElement>
          </div>

          {/* Nhánh phải */}
          <div className="flex items-center space-x-45 space-y-10" data-aos="fade-left">
            <ArcherElement 
              id="ai-box"
              relations={[{ targetId: "ai-image", targetAnchor: "top", sourceAnchor: "bottom" }]}
            >
              <img src={AIPicture} alt="Hinh anh" className="w-90 h-60 rounded-4xl" />
            </ArcherElement>
            <div className="bg-white-100 p-4 h-60 w-74 text-2xl">
              Sử dụng AI để đánh giá số điểm các môn học, từ đó đề xuất cho học sinh những trường đại học phù hợp
            </div>
          </div>
        </div>

        {/* Tiêu đề phụ */}
        <h2 className="text-center text-xl font-bold mt-12" data-aos="fade-up">
          Tại sao nên chọn chúng tôi?
        </h2>
        <p className="text-center text-sm text-gray-500" data-aos="fade-up">
          Được sử dụng bởi nhiều học sinh
        </p>

        {/* Ô thống kê */}
        <div className="flex justify-center space-x-6 mt-6" data-aos="zoom-in">
          <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
          <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
          <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
          <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </ArcherContainer>
  );
};

export default BodySection;
