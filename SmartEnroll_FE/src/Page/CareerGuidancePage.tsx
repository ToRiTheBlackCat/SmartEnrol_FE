import React from "react";
import Header from "../Components/HomePage/Header";
import image from "../assets/CareerGuidance.png";

import AnimatedText from "../Service/AnimatedText";
import {motion} from "framer-motion";
import { useNavigate } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const CareerGuidancePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
    <Header/>
    <div className="mt-20 min-h-screen bg-gradient-to-b from-pink-100 to-purple-500 p-6">
      {/* Main Content */}
      <div className="max-w-5xl mx-auto flex">
        {/* Left Content */}
        <div className="flex-1 pr-6">
          <h1 className="font-bold text-black text-5xl  mb-4">

            <AnimatedText text="Chỉ với những thông tin về bản thân bạn, bạn sẽ có câu trả lời"/>
          </h1>
          <p className="text-gray-600 text-3xl mb-6">
            <AnimatedText text="Khám phá bản thân với những thông tin về cá tính của bạn và bạn sẽ biết
            được chính xác mình phù hợp với con đường nào. Chúng tôi sẽ đưa ra những
            kết quả chi tiết để qua đó giúp bạn tham khảo và chọn ra con đường cho tương lai."/>
          </p>

          {/* Buttons */}
          <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="flex justify-center gap-6 mb-6"
            >
              <motion.button
                className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition"
                whileHover={{ scale: 1.1 }}
              >
                Tìm hiểu thêm
              </motion.button>
              <motion.button
                className="px-6 py-3 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition"
                whileHover={{ scale: 1.1 }}
                onClick={() => navigate("/holland-Test")}
              >
                Thử ngay
              </motion.button>
            </motion.div>
        </div>

        {/* Right Content (Image) */}
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex justify-center items-center w-1/3"
          >
            <img src={image} alt="Hình minh họa" className="w-full rounded-lg" />
          </motion.div>
      </div>

      {/* Steps Section */}
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold text-black mb-4">Cách hoạt động</h2>
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
            }}
            className="grid grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { text: "Nhập tính cách của bạn", bg: "bg-yellow-300" },
              { text: "Định hướng nghề nghiệp", bg: "bg-green-300" },
              { text: "Hướng nghiệp cho bạn", bg: "bg-cyan-300" },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`${item.bg} p-6 rounded-lg shadow-md`}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-lg font-bold">0{index + 1}</h3>
                <p className="text-gray-700">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
      </div>
    </div>
    </>
  );
};

export default CareerGuidancePage;
