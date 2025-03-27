import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../../tailwind.css";
import AIPicture from "../../assets/AI.jpg";
import UniPicture from "../../assets/dai-hoc-fpt-tp-hcm-1.jpeg";
import Logo from "../../assets/LOGO/3.png";
import AnimatedText from "../../Service/AnimatedText";
import { fetchVietnamUniversities } from "../../Service/api";
import { University } from "../../Service/type";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import tech from "../../assets/cntt.jpg";
import economic from "../../assets/kinhte.jpeg";
import medical from "../../assets/yte.jpg";

const BodySection: React.FC = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [universities, setUniversities] = useState<University[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const universitiesPerPage = 3;

  useEffect(() => {
    const getUniversities = async () => {
      const data = await fetchVietnamUniversities();
      console.log(data)
      setUniversities(data);
    };

    getUniversities();
  }, []);

  // Hàm lấy logo từ domain
  const getUniversityLogo = (domains: string[]) => {
    if (domains.length === 0) return "https://example.com/default-logo.png";
    return `https://logo.clearbit.com/${domains[0]}`;
  };
  const visibleUniversities = universities.slice(currentIndex, currentIndex + universitiesPerPage);

  // Chuyển sang nhóm trường tiếp theo
  const nextUniversities = () => {
    if (currentIndex + universitiesPerPage < universities.length) {
      setCurrentIndex(currentIndex + universitiesPerPage);
    }
  };

  // Quay về nhóm trường trước đó
  const prevUniversities = () => {
    if (currentIndex - universitiesPerPage >= 0) {
      setCurrentIndex(currentIndex - universitiesPerPage);
    }
  };

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

      <div id="universities" data-section className="relative flex items-center justify-center mt-6">
        {/* Nút Trước */}
        <button
          onClick={prevUniversities}
          disabled={currentIndex === 0}
          className="absolute left-0 text-white p-3 rounded-full hover:bg-gray-700 disabled:opacity-50 transition"
        >
          <FaChevronLeft size={32} />
        </button>

        {/* Danh sách trường */}
        <div className="flex gap-6">
          {visibleUniversities.length > 0 ? (
            visibleUniversities.map((uni, index) => (
              <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-md text-center w-60">
                <img
                  src={getUniversityLogo(uni.domains)}
                  alt={uni.name}
                  onError={(e) => (e.currentTarget.src = "https://example.com/default-logo.png")}
                  className="w-24 h-24 mx-auto rounded-full bg-white p-2"
                />
                <h3 className="mt-2 text-white font-semibold">{uni.name}</h3>
              </div>
            ))
          ) : (
            <p className="text-white">Đang tải danh sách trường...</p>
          )}
        </div>

        {/* Nút Sau */}
        <button
          onClick={nextUniversities}
          disabled={currentIndex + universitiesPerPage >= universities.length}
          className="absolute right-0 text-white p-3 rounded-full hover:bg-gray-700 disabled:opacity-50 transition"
        >
          <FaChevronRight size={32} />
        </button>
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
         <div className="w-32 h-32">
    <img
      src={tech}
      alt="Công nghệ thông tin"
      className="w-full h-full object-cover rounded-lg"
    />
    <p className="text-center text-white mt-2">Công nghệ thông tin</p>
  </div>
  <div className="w-32 h-32">
    <img
      src={economic}
      alt="Kinh tế"
      className="w-full h-full object-cover rounded-lg"
    />
    <p className="text-center text-white mt-2">Kinh tế</p>
  </div>
  <div className="w-32 h-32">
    <img
      src={medical}
      alt="Y khoa"
      className="w-full h-full object-cover rounded-lg"
    />
    <p className="text-center text-white mt-2">Y khoa</p>
  </div>
      </div>
    </div>
  );
};

export default BodySection;
