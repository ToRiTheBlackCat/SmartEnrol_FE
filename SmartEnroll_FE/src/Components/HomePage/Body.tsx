import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../../tailwind.css";
import AIPicture from "../../assets/AI.jpg";
import UniPicture from "../../assets/dai-hoc-fpt-tp-hcm-1.jpeg";
import Logo from "../../assets/LOGO/3.png";
import AnimatedText from "../../Service/AnimatedText";

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
    <div className="relative overflow-hidden bg-gray-900 pt-16 pb-32 space-y-24">
      {/* Tiêu đề chính */}
      <motion.h2
        id="main-title"
        data-section
        initial={{ opacity: 0, y: -10 }}
        animate={visibleSections.has("main-title") ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center text-2xl text-white font-bold mb-8"
      >
        <AnimatedText text="Chúng tôi có gì" />
      </motion.h2>

      {/* Nội dung chính */}
      <div className="flex flex-col items-center space-y-40">
        {/* Hình ảnh chính và mô tả */}
        <motion.div
          id="main-description"
          data-section
          initial={{ opacity: 0, y: -10 }}
          animate={visibleSections.has("main-description") ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center space-x-30"
        >
          <img src={Logo} alt="Logo" className="w-80 h-60 rounded-3xl" />
          <div className="text-white p-4 h-60 w-80 text-2xl">
            <AnimatedText text="AI Agent tư vấn tuyển sinh đại học cung cấp phương thức tuyển sinh và các ngành học mới nhất..." />
          </div>
        </motion.div>

        {/* Nhánh trái */}
        <motion.div
          id="university-info"
          data-section
          initial={{ opacity: 0, x: -10 }}
          animate={visibleSections.has("university-info") ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center space-x-45"
        >
          <div className="text-white p-4 h-100 w-55 text-2xl">
            <AnimatedText text="Luôn cập nhật các quy chế tuyển sinh mới nhất ... qua các năm" />
          </div>
          <img src={UniPicture} alt="Hinh anh" className="w-90 h-60 rounded-4xl" />
        </motion.div>

        {/* Nhánh phải */}
        <motion.div
          id="ai-box"
          data-section
          initial={{ opacity: 0, x: 10 }}
          animate={visibleSections.has("ai-box") ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center space-x-45 mb-5"
        >
          <img src={AIPicture} alt="Hinh anh" className="w-90 h-60 rounded-4xl" />
          <div className="text-white p-4 h-60 w-74 text-2xl">
            <AnimatedText text="Sử dụng AI để đánh giá số điểm học bạ của học sinh, từ đó đề xuất cho học sinh những trường đại học phù hợp" />
          </div>
        </motion.div>
      </div>

      {/* Tiêu đề phụ */}
      <motion.h2
        id="why-choose-us"
        data-section
        initial={{ opacity: 0, y: 10 }}
        animate={visibleSections.has("why-choose-us") ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center text-xl text-white font-bold mt-12"
      >
        <AnimatedText text="Tại sao nên chọn chúng tôi?" />
      </motion.h2>
      <motion.p
        id="why-choose-us"
        data-section
        initial={{ opacity: 0, y: 10 }}
        animate={visibleSections.has("why-choose-us") ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center text-sm text-gray-500"
      >
        <AnimatedText text="Được sử dụng bởi nhiều học sinh" />
      </motion.p>

      {/* Ô thống kê */}
      <div id="stats" data-section className="flex justify-center space-x-6 mt-6">
        <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
        <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
        <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
      </div>

      {/* Top các trường đại học Việt Nam */}
      <motion.h2
        id="top-universities"
        data-section
        initial={{ opacity: 0, y: 10 }}
        animate={visibleSections.has("top-universities") ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center text-xl text-white font-bold mt-12"
      >
        <AnimatedText text="Top các trường đại học Việt Nam" />
      </motion.h2>

      <div id="universities" data-section className="flex justify-center space-x-6 mt-6">
        <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
        <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
        <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
      </div>

      {/* Top các ngành sinh viên lựa chọn */}
      <motion.h2
        id="top-majors"
        data-section
        initial={{ opacity: 0, y: 10 }}
        animate={visibleSections.has("top-majors") ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center text-xl text-white font-bold mt-12"
      >
        <AnimatedText text="Top các ngành sinh viên lựa chọn" />
      </motion.h2>

      <div id="majors" data-section className="flex justify-center space-x-6 mt-6">
        <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
        <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
        <div className="w-30 h-30 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );
};

export default BodySection;
