import React, { useState } from 'react';
import Logo from '../assets/LOGO/1.png'
import { chatbotService } from '../Service/chatbotService';

interface Message {
  id: number;
  content: string;
  isBot: boolean;
  timestamp: string;
}

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const now = new Date().toLocaleTimeString();
      const userMessage = inputMessage;
      
      console.log('Sending message:', userMessage);
      
      setMessages([
        ...messages,
        { 
          id: Date.now(), 
          content: userMessage, 
          isBot: false,
          timestamp: now
        }
      ]);
      setInputMessage('');
      setIsTyping(true);
      
      try {
        console.log('Calling chatbot API...');
        const response = await chatbotService.sendMessage(userMessage);
        console.log('Chatbot response:', response);
        
        setMessages(prev => [...prev, {
          id: Date.now(),
          content: response.answer,
          isBot: true,
          timestamp: new Date().toLocaleTimeString()
        }]);
      } catch (error: any) {
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        
        setMessages(prev => [...prev, {
          id: Date.now(),
          content: "Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau.",
          isBot: true,
          timestamp: new Date().toLocaleTimeString()
        }]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${
        isSidebarExpanded ? 'w-64' : 'w-20'
      } bg-white border-r shadow-sm transition-all duration-300 ease-in-out flex flex-col`}>
        {/* Logo Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <img src={Logo} alt="Smart Enrol Logo" className="h-8 w-8" />
            <span className={`font-bold text-xl whitespace-nowrap transition-opacity duration-300 ${
              isSidebarExpanded ? 'opacity-100' : 'opacity-0'
            }`}>
              Smart Enrol
            </span>
          </div>
          <button 
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            className="p-1 rounded-lg hover:bg-gray-100 focus:outline-none"
          >
            {isSidebarExpanded ? (
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>

        {/* New Chat Button */}
        <button 
          className={`flex items-center px-4 py-3 mt-2 hover:bg-gray-100 transition duration-200 ${
            isSidebarExpanded ? 'justify-start space-x-2' : 'justify-center'
          }`}
          onClick={() => setMessages([])}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span className={`text-gray-700 transition-opacity duration-300 ${
            isSidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
          }`}>
            Cuộc trò chuyện mới
          </span>
        </button>

        {/* Chat History */}
        <div className="mt-4 flex-1 overflow-y-auto">
          <div className={`px-4 py-2 text-sm font-medium text-gray-600 ${
            !isSidebarExpanded && 'text-center'
          }`}>
            {isSidebarExpanded ? 'Lịch sử trò chuyện' : '💬'}
          </div>
          <div className="space-y-1 mt-2">
            {messages.length > 0 && (
              <div className={`px-4 py-2 hover:bg-gray-100 cursor-pointer transition duration-200 ${
                !isSidebarExpanded && 'text-center'
              }`}>
                {isSidebarExpanded ? (
                  <>
                    <div className="text-sm font-medium text-gray-800">Cuộc trò chuyện hiện tại</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {messages[messages.length - 1].content.substring(0, 30)}...
                    </div>
                  </>
                ) : (
                  <div className="text-sm">💬</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Settings Footer */}
        <div className="mt-auto p-4 border-t border-gray-200">
          <div className={`flex items-center ${
            isSidebarExpanded ? 'justify-between' : 'justify-center'
          } text-sm text-gray-600`}>
            <button className={`hover:text-gray-900 flex items-center ${
              isSidebarExpanded ? 'space-x-2' : 'justify-center'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {isSidebarExpanded && <span>Tạo workspace</span>}
            </button>
            {isSidebarExpanded && (
              <button className="hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="h-16 border-b flex items-center px-6 bg-white shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h2 className="font-medium text-gray-800">Smart Enrol </h2>
              <p className="text-xs text-gray-500">{isTyping ? 'Đang nhập...' : 'Trực tuyến'}</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <img src={Logo} alt="Bot Avatar" className="w-16 h-16 mb-4" />
              <h1 className="text-2xl font-bold mb-2">Xin chào, tôi là Smart Enrol.</h1>
              <p className="text-gray-600 text-center max-w-md mb-8">
                Tôi có thể giúp bạn trả lời các câu hỏi về dịch vụ của chúng tôi. 
                Hãy đặt câu hỏi để bắt đầu!
              </p>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4 max-w-2xl w-full mb-8">
                <button className="flex items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    📚
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-800">Hướng dẫn sử dụng</h3>
                    <p className="text-sm text-gray-500">Tìm hiểu cách sử dụng Smart Enrol</p>
                  </div>
                </button>
                <button className="flex items-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    🎯
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-800">Tính năng mới</h3>
                    <p className="text-sm text-gray-500">Khám phá các tính năng mới</p>
                  </div>
                </button>
              </div>

              {/* Suggested Questions */}
              <div className="w-full max-w-2xl">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Câu hỏi thường gặp</h3>
                <div className="space-y-2">
                  {[
                    "Smart Enrol là gì?",
                    "Làm thế nào để bắt đầu sử dụng?",
                    "Các tính năng chính của Smart Enrol?",
                    "Chính sách bảo mật của Smart Enrol?"
                  ].map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputMessage(question);
                        handleSendMessage();
                      }}
                      className="w-full text-left px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 text-sm"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[70%] ${message.isBot ? 'order-2' : 'order-1'}`}>
                    <div className={`rounded-2xl px-4 py-2 ${
                      message.isBot 
                        ? 'bg-gray-100 text-gray-800' 
                        : 'bg-blue-500 text-white'
                    }`}>
                      {message.content}
                    </div>
                    <div className={`text-xs mt-1 ${
                      message.isBot ? 'text-left' : 'text-right'
                    } text-gray-500`}>
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-4 py-2">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t p-4 bg-white">
          <div className="max-w-4xl mx-auto">
            {/* Quick Actions Bar */}
            <div className="flex space-x-2 mb-3">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div className="flex-1"></div>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Nhập tin nhắn của bạn..."
              />
              <button
                onClick={handleSendMessage}
                className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition duration-200 flex items-center space-x-2"
              >
                <span>Gửi</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage; 