import React, { useEffect, useState } from "react";
import '../../tailwind.css'; 
import { ArcherContainer, ArcherElement } from "react-archer";
import AIPicture from '../../assets/AI.jpg';
import UniPicture from '../../assets/dai-hoc-fpt-tp-hcm-1.jpeg';
import Logo from '../../assets/LOGO/3.png';
// import {motion} from 'framer-motion';

const BodySection: React.FC = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]");
      const newVisibleSections = new Set<string>();

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
          newVisibleSections.add(section.id);
        }
      });

      setVisibleSections(newVisibleSections);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Kiểm tra ban đầu

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ArcherContainer 
      strokeColor="#FF0000" 
      strokeWidth={3}
      endMarker={false}
      lineStyle="curve"
    >
      <div className="relative overflow-hidden bg-gray-900 pt-16 pb-32 space-y-24">
        {/* Tiêu đề chính */}
        <h2
          id="main-title"
          data-section
          className={`text-center text-2xl text-white font-bold mb-8 transition-all duration-700 ${
            visibleSections.has("main-title") ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          Chúng tôi có gì
        </h2>

        {/* Nội dung chính */}
        <div className="flex flex-col items-center space-y-40">
          
          {/* Hình ảnh chính và mô tả */}
          <div
            id="main-description"
            data-section
            className={`flex items-center space-x-30 transition-all duration-700 ${
              visibleSections.has("main-description") ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            <ArcherElement
              id="main-description"
              relations={[{ targetId: "university-info", targetAnchor: "top", sourceAnchor: "bottom" }]}
            >
              <img src={Logo} alt="Logo" className="w-80 h-60 rounded-3xl" />
            </ArcherElement>
            <div className="text-white p-4 h-60 w-80 text-2xl">
            Ai Agent tư vấn tuyển sinh đại học cung cấp... phương thức tuyển sinh và các ngành học mới nhất.....
            </div>
          </div>

          {/* Nhánh trái */}
          <div
            id="university-info"
            data-section
            className={`flex items-center space-x-45 transition-all duration-700 ${
              visibleSections.has("university-info") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="text-white p-4 h-100 w-55 text-2xl">
              Luôn cập nhật các quy chế tuyển sinh mới nhất ... qua các năm 
            </div>
            <ArcherElement 
              id="university-info"
              relations={[{ targetId: "ai-box", targetAnchor: "top", sourceAnchor: "bottom" }]}
            >
              <img src={UniPicture} alt="Hinh anh" className="w-90 h-60 rounded-4xl" />
            </ArcherElement>
          </div>

          {/* Nhánh phải */}
          <div
            id="ai-box"
            data-section
            className={`flex items-center space-x-45 transition-all duration-700 mb-5 ${
              visibleSections.has("ai-box") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <ArcherElement 
              id="ai-box"
              relations={[{ targetId: "ai-image", targetAnchor: "top", sourceAnchor: "bottom" }]}
            >
              <img src={AIPicture} alt="Hinh anh" className="w-90 h-60 rounded-4xl" />
            </ArcherElement>
            <div className="text-white p-4 h-60 w-74 text-2xl">
              Sử dụng AI để đánh giá số điểm học bạ của học sinh, từ đó đề xuất cho học sinh những trường đại học phù hợp
            </div>
          </div>
        </div>

        {/* Tiêu đề phụ */}
        <h2
          id="why-choose-us"
          data-section
          className={`text-center text-xl text-white font-bold mt-12 transition-all duration-700  ${
            visibleSections.has("why-choose-us") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Tại sao nên chọn chúng tôi?
        </h2>
        <p 
        id="why-choose-us"
        data-section
        className={`text-center text-sm text-gray-500 ${
          visibleSections.has("why-choose-us") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>Được sử dụng bởi nhiều học sinh</p>

        {/* Ô thống kê */}
        <div
          id="stats"
          data-section
          className={`flex justify-center space-x-6 mt-6 transition-all duration-700 ${
            visibleSections.has("stats") ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
          <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
          <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
          <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
        </div>
                {/* Top các trường đại học Việt Nam */}
                <h2
          id="top-universities"
          data-section
          className={`text-center text-xl text-white font-bold mt-12 transition-all duration-700  ${
            visibleSections.has("top-universities") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Top các trường đại học Việt Nam
        </h2>
        <div
          id="universities"
          data-section
          className={`flex justify-center space-x-6 mt-6 transition-all duration-700 ${
            visibleSections.has("universities") ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
        <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
        <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
          {/* <img src={require('../../assets/university1.png')} alt="University 1" className="w-24 h-24" />
          <img src={require('../../assets/university2.png')} alt="University 2" className="w-24 h-24" />
          <img src={require('../../assets/university3.png')} alt="University 3" className="w-24 h-24" /> */}
        </div>

        {/* Top các ngành sinh viên lựa chọn */}
        <h2
          id="top-majors"
          data-section
          className={`text-center text-xl text-white font-bold mt-12 transition-all duration-700  ${
            visibleSections.has("top-majors") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Top các ngành sinh viên lựa chọn
        </h2>
        <div
          id="majors"
          data-section
          className={`flex justify-center space-x-6 mt-6 transition-all duration-700 ${
            visibleSections.has("majors") ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
          <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
          <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
          {/* <img src={require('../../assets/major1.png')} alt="Major 1" className="w-24 h-24" />
          <img src={require('../../assets/major2.png')} alt="Major 2" className="w-24 h-24" />
          <img src={require('../../assets/major3.png')} alt="Major 3" className="w-24 h-24" /> */}
        </div>

      </div>
    </ArcherContainer>
  );
};

export default BodySection;