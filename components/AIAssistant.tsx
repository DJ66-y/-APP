import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService'; // 实际上引用的是 DeepSeek 服务
import { ChatMessage } from '../types';
import { Send, Bot, Sparkles, Loader2, AlertCircle, Mic, MicOff } from 'lucide-react';

export const AIAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: '嗨！我是你的制图“大师兄”。\n不管是圆弧连接画不圆，还是三视图看不懂，尽管问我！我会用最简单的话讲给你听。',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 语音识别逻辑
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    // 浏览器兼容性处理
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("抱歉，您的浏览器暂不支持语音输入功能，建议使用 Chrome 浏览器。");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await geminiService.sendMessage(userMsg.text, messages);
      const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = { 
        role: 'model', 
        text: '哎呀，网络稍微有点卡，大师兄正在重连 DeepSeek，请稍后再试一下！', 
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-4 flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <Bot className="text-white w-6 h-6" />
        </div>
        <div>
            <h2 className="text-white font-bold text-lg">AI 智能助教</h2>
            <p className="text-blue-100 text-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Powered by DeepSeek
            </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-hide">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
                className={`max-w-[85%] rounded-2xl p-4 shadow-sm text-sm leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : msg.isError 
                        ? 'bg-red-50 text-red-600 border border-red-100 rounded-bl-none'
                        : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
                }`}
            >
                {msg.isError && <AlertCircle className="w-4 h-4 inline mr-2" />}
                <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none p-4 shadow-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                    <span className="text-slate-400 text-xs">大师兄正在思考...</span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex gap-2 items-center bg-slate-50 border border-slate-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
            <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isListening ? "正在听你说..." : "有问题尽管问..."}
                className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 text-sm"
                disabled={isLoading}
            />
            
            <button
                onClick={toggleListening}
                disabled={isLoading}
                className={`p-2 rounded-full transition-colors ${
                    isListening 
                    ? 'bg-red-100 text-red-600 animate-pulse' 
                    : 'hover:bg-slate-200 text-slate-500'
                }`}
                title="语音输入"
            >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <Send className="w-4 h-4" />
            </button>
        </div>
        <div className="text-center mt-2">
            <p className="text-[10px] text-slate-400">内容由 DeepSeek 生成，请以国家标准(GB)为准。</p>
        </div>
      </div>
    </div>
  );
};