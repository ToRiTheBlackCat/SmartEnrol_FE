import axiosInstance from "../Hooks/axiosInstance";

const API_URL = "https://smartenrol2.azurewebsites.net/api";

// Interface cho response từ API
export interface ChatbotResponse {
  answer: string;
}

// Interface cho request gửi đến API
export interface ChatbotRequest {
  userInput: string;
}

// Service để gọi API chatbot
export const chatbotService = {
  // Gửi câu hỏi đến chatbot và nhận câu trả lời
  sendMessage: async (message: string, sessionID: string): Promise<ChatbotResponse> => {
    try {
      // Log request params
      console.log('Request params:', { userInput: message, sessionsID: sessionID });

      const response = await axiosInstance.post<ChatbotResponse>(
        `${API_URL}/Chat`,
        null,
        {
          params: {
            userInput: message,
            sessionID: sessionID
          },
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      // Log response
      console.log('API Response:', response.data);
      
      // Nếu response là string
      if (typeof response.data === 'string') {
        return { answer: response.data };
      }
      
      // Nếu response là object có answer
      if (response.data && response.data.answer) {
        return response.data;
      }
      
      // Fallback cho các trường hợp khác
      return {
        answer: typeof response.data === 'string' ? response.data : JSON.stringify(response.data)
      };
    } catch (error: any) {
      // Log detailed error
      console.error('Chatbot API Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
      throw error;
    }
  }
};

export default chatbotService; 