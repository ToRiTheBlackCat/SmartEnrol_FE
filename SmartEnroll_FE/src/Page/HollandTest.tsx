import React, { useEffect, useState, useRef } from "react";
import hollandQuestion from "../data/HollandQuestion.json"; // Import JSON
import { motion } from "framer-motion";
import Header from "../Components/HomePage/Header";
import chatbotService from "../Service/chatbotService";
import { RootState } from "../Store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

const HollandTest: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [dominantType, setDominantType] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [randomQuestions, setRandomQuestions] = useState<any[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();
  const [sessionID] = useState<string>(localStorage.getItem("chatSessionID") || "");

  const hasRandomized = useRef(false);

  const getRandomQuestions = (questions: any[], count: number) => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    if (!token) {
      toast.warning("Bạn cần đăng nhập để thực hiện bài trắc nghiệm");
      navigate("/login");
    }

    if (!hasRandomized.current) {
      const selectedQuestions = getRandomQuestions(hollandQuestion, 15);
      console.log("Selected Questions:", selectedQuestions);
      setRandomQuestions(selectedQuestions);
      hasRandomized.current = true;
    }
  }, [token, navigate]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: answer }));
  };

  const handleNext = () => {
    if (currentIndex < randomQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
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
    const scores: Record<string, number> = {
      "Problem Solving": 0,
      "Creative": 0,
      "Artistic": 0,
      "Logical Thinking": 0,
      "Communication Skills": 0,
      "Teamwork": 0,
      "Analytical Thinking": 0,
      "Attention to Detail": 0,
      "Leadership": 0,
      "Adaptability": 0,
      "Time Management": 0,
      "Critical Thinking": 0,
      "Self-Motivation": 0,
      "Resilience": 0,
      "Emotional Intelligence": 0,
      "Decision Making": 0,
      "Research Skills": 0,
      "Networking": 0,
      "Innovation": 0,
      "Risk Management": 0,
      "Conflict Resolution": 0,
      "Persuasion": 0,
      "Strategic Thinking": 0,
      "Multitasking": 0,
      "Cultural Awareness": 0,
      "Customer Service": 0,
      "Negotiation Skills": 0,
      "Empathy": 0,
      "Public Speaking": 0,
      "Writing Skills": 0,
      "Design Thinking": 0,
      "Creativity": 0,
    };

    randomQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === "Có") {
        scores[question.type] += 1;
      }
    });

    const dominant = Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b
    );
    setDominantType(dominant);

    const prompt = `Tôi đã hoàn thành bài test Holland. Tính cách chiếm ưu thế là: ${dominant}. Đề xuất ngành nghề phù hợp với nhóm tính cách này của tôi.`;
    handleSubmitToAI(prompt);
  };

  const handleSubmitToAI = async (prompt: string) => {
    setLoading(true);
    try {
      const response = await chatbotService.sendMessage(prompt, sessionID);
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
            <h2 className="text-2xl font-semibold text-black mb-4">
              Bạn đã hoàn thành bài test Holland. Tính cách chiếm ưu thế là: {dominantType}.
            </h2>
            {loading ? (
              <p className="text-lg text-blue-500 mt-4">Đang lấy dữ liệu từ AI...</p>
            ) : (
              aiResponse && (
                <div className="mt-4 p-4 shadow-md">
                  <h3 className="text-lg font-semibold text-green-700">Gợi ý ngành nghề:</h3>
                  <p className="text-gray-800">{aiResponse}</p>
                </div>
              )
            )}
          </div>
        ) : randomQuestions.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold text-black mb-4">
              {randomQuestions[currentIndex].question}
            </h2>
            <div className="flex space-x-6 mb-6 gap-10">
              {randomQuestions[currentIndex].answers.map((answer: string, idx: number) => (
                <motion.button
                  key={idx}
                  onClick={() => handleAnswerSelect(answer)}
                  className={`p-3 rounded-full shadow-md transition text-black ${
                    selectedAnswers[currentIndex] === answer
                      ? "bg-green-300 hover:bg-green-500"
                      : "bg-gray-300 hover:bg-blue-300"
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {answer === "Có" ? (
                    <CheckIcon className="w-6 h-6" />
                  ) : (
                    <XMarkIcon className="w-6 h-6" />
                  )}
                </motion.button>
              ))}
            </div>

            <div className="flex space-x-6 mt-6 gap-10">
              <motion.button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="p-3 rounded-full shadow-md transition text-black hover:bg-blue-300 disabled:opacity-50"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowLeftIcon className="w-6 h-6" />
              </motion.button>
              <motion.button
                onClick={handleNext}
                className="p-3 rounded-full shadow-md transition text-black hover:bg-blue-300"
                whileHover={{ scale: 1.1 }}
              >
                {currentIndex === randomQuestions.length - 1 ? (
                  "Hoàn thành"
                ) : (
                  <ArrowRightIcon className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </>
        ) : (
          <p>Đang tải câu hỏi...</p>
        )}
      </div>
    </>
  );
};

export default HollandTest;
