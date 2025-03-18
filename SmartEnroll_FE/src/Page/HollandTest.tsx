import React, { useState } from "react";
import hollandQuestion from "../data/HollandQuestion.json"; // Import JSON
import { motion } from "framer-motion";
import Header from "../Components/HomePage/Header";
import chatbotService  from "../Service/chatbotService";

const HollandTest: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: answer }));
  };

  const handleNext = () => {
    if (currentIndex < hollandQuestion.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Khi hoàn thành bài test, tạo prompt
      setIsCompleted(true);
      generatePrompt();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const generatePrompt = () => {
    // Khởi tạo điểm số của từng nhóm tính cách
    const scores: Record<string, number> = {
      Realistic: 0,
      Investigative: 0,
      Artistic: 0,
      Social: 0,
      Enterprising: 0,
      Conventional: 0,
    };

    // Duyệt qua tất cả câu trả lời và tăng điểm nếu chọn "Có"
    hollandQuestion.forEach((question, index) => {
      if (selectedAnswers[index] === "Có") {
        scores[question.type] += 1;
      }
    });

    // Xác định nhóm tính cách có điểm cao nhất
    const dominantType = Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b
    );

    // Prompt kết quả
    const prompt = `Người dùng đã hoàn thành bài test Holland. Tính cách chiếm ưu thế là: ${dominantType}. Đề xuất ngành nghề phù hợp với nhóm tính cách này.`;
    setGeneratedPrompt(prompt);
    handleSubmitToAI(prompt);
  };

  const handleSubmitToAI = async (prompt: string) => {
    setLoading(true);
    try {
      const response = await chatbotService.sendMessage(prompt);
      setAiResponse(response.answer);
    } catch (error) {
      console.error("Lỗi gọi chatbot:", error);
      setAiResponse("Không thể lấy câu trả lời từ AI.");
    }
    setLoading(false);
  };

    return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-pink-300 to-purple-400 p-6">
        {isCompleted ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Bài test đã hoàn thành! 🎉
            </h2>
            <p className="text-lg text-gray-800 bg-white p-4 rounded-lg shadow-md">{generatedPrompt}</p>

            {loading ? (
              <p className="text-lg text-blue-500 mt-4">Đang lấy dữ liệu từ AI...</p>
            ) : (
              aiResponse && (
                <div className="mt-4 p-4 bg-green-100 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-green-700">Gợi ý ngành nghề:</h3>
                  <p className="text-gray-800">{aiResponse}</p>
                </div>
              )
            )}
          </div>
        ) : (
          <>
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
                className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md transition hover:bg-blue-600 disabled:bg-gray-300"
                whileHover={{ scale: 1.1 }}
              >
                {currentIndex === hollandQuestion.length - 1 ? "Hoàn thành" : "Câu tiếp theo"}
              </motion.button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HollandTest;
