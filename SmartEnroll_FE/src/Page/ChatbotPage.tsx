import React, { useState } from 'react';
import Logo from '../assets/LOGO/1.png'

interface Message {
  id: number;
  content: string;
  isBot: boolean;
}

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([
        ...messages,
        { id: Date.now(), content: inputMessage, isBot: false }
      ]);
      setInputMessage('');
      // Thêm phản hồi của bot (có thể tích hợp API của bạn ở đây)
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now(),
          content: "Đây là phản hồi mẫu từ Smart Enrol Bot",
          isBot: true
        }]);
      }, 1000);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-4">
          <img src={Logo} alt="Smart Enrol Logo" className="h-8" />
        </div>
        <button 
          className="w-full px-4 py-2 mt-2 text-left flex items-center space-x-2 hover:bg-gray-100"
          onClick={() => setMessages([])}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>Cuộc trò chuyện mới</span>
        </button>
        <div className="mt-4">
          <div className="px-4 py-2 text-sm text-gray-600">7 Ngày qua</div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <img src={Logo} alt="Bot Avatar" className="w-16 h-16 mb-4" />
              <h1 className="text-2xl font-bold mb-2">Xin chào, tôi là Smart Enrol.</h1>
              <p className="text-gray-600">Tôi có thể giúp gì cho bạn hôm nay?</p>
            </div>
          ) : (
            messages.map(message => (
              <div
                key={message.id}
                className={`mb-4 ${message.isBot ? 'flex' : 'flex justify-end'}`}
              >
                <div className={`max-w-[70%] p-3 rounded-lg ${
                  message.isBot ? 'bg-gray-100' : 'bg-blue-500 text-white'
                }`}>
                  {message.content}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tin nhắn của bạn..."
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage; 