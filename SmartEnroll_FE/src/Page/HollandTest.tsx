import React, { useState } from "react";
import hollandQuestion from "../data/HollandQuestion.json"; // Import JSON
import { motion } from "framer-motion";
import Header from "../Components/HomePage/Header";

const HollandTest: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: answer }));
  };

  const handleNext = () => {
    if (currentIndex < hollandQuestion.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
    <Header/>
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-pink-300 to-purple-400 p-6">
      {/* Câu trả lời dạng button (nằm ngang) */}
      

      {/* Hiển thị câu hỏi */}
      <h2 className="text-2xl font-semibold text-black mb-4">
        {hollandQuestion[currentIndex].question}
      </h2>
      <div className="flex space-x-6 mb-6 gap-10">
        {hollandQuestion[currentIndex].answers.map((answer, idx) => (
          <motion.button
            key={idx}
            onClick={() => handleAnswerSelect(answer)}
            className={`px-6 py-3 rounded-full text-white shadow-md transition ${
              selectedAnswers[currentIndex] === answer
                ? "bg-blue-600"
                : "bg-gray-500 hover:bg-gray-600"
            }`}
            whileHover={{ scale: 1.1 }}
          >
            {answer}
          </motion.button>
        ))}
      </div>

      {/* Nút "Câu trước" và "Câu tiếp theo" */}
      <div className="flex space-x-6 mt-6 gap-10">
        <motion.button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-6 py-3 bg-yellow-400 text-black rounded-full shadow-md transition hover:bg-yellow-500 disabled:bg-gray-300"
          whileHover={{ scale: 1.1 }}
        >
          Câu trước
        </motion.button>

        <motion.button
          onClick={handleNext}
          disabled={currentIndex === hollandQuestion.length - 1}
          className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md transition hover:bg-blue-600 disabled:bg-gray-300"
          whileHover={{ scale: 1.1 }}
        >
          Câu tiếp theo
        </motion.button>
      </div>
    </div>
    </>
  );
};

export default HollandTest;
