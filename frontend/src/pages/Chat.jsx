import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, RefreshCw, DownloadCloud, Copy, Trash2, Menu, X, Moon, Sun, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';

const GeminiChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [currentChatId, setCurrentChatId] = useState(null);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input field when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  // Load chat history on mount
  useEffect(() => {
    fetchChatHistory();
  }, []);
  
  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/chats`, 
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (response.data.success) {
        setChatHistory(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };
  
  const createNewChat = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/chats`, 
        { title: 'New Chat' },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (response.data.success) {
        setCurrentChatId(response.data.data._id);
        setMessages([]);
        await fetchChatHistory();
        setInput('');
        setSidebarOpen(false);
      }
    } catch (error) {
      console.error('Error creating new chat:', error);
      toast.error('Failed to create new chat');
    } finally {
      setLoading(false);
    }
  };
  
  const loadChat = async (chatId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/chats/${chatId}`, 
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (response.data.success) {
        setMessages(response.data.data.messages);
        setCurrentChatId(chatId);
        setSidebarOpen(false);
      }
    } catch (error) {
      console.error('Error loading chat:', error);
      toast.error('Failed to load chat');
    } finally {
      setLoading(false);
    }
  };
  
  const deleteChat = async (chatId, e) => {
    e.stopPropagation(); // Prevent triggering loadChat
    
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/chats/${chatId}`, 
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (response.data.success) {
        toast.success('Chat deleted');
        if (currentChatId === chatId) {
          setMessages([]);
          setCurrentChatId(null);
        }
        await fetchChatHistory();
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
      toast.error('Failed to delete chat');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Create a new chat if none is active
    if (!currentChatId) {
      await createNewChat();
    }
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/gemini/chat`,
        {
          message: input,
          chatId: currentChatId
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (response.data.success) {
        const aiMessage = { role: 'assistant', content: response.data.data.response };
        setMessages(prev => [...prev, aiMessage]);
        await fetchChatHistory(); // Refresh chat history to update titles
      } else {
        throw new Error(response.data.message || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error.message || 'Error communicating with Gemini API');
      toast.error(error.message || 'Error communicating with Gemini API');
    } finally {
      setLoading(false);
    }
  };
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };
  
  const downloadConversation = () => {
    const content = messages.map(msg => `${msg.role === 'user' ? 'You' : 'Gemini'}: ${msg.content}`).join('\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `gemini-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}>
      {/* Header */}
      <Navbar />
      
      {/* Main Content */}
      <div className="flex h-screen pt-16">
        {/* Sidebar */}
        <div 
          className={`${darkMode ? 'bg-gray-900' : 'bg-white'} fixed top-16 left-0 w-64 h-screen overflow-y-auto transition-transform transform z-20 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:static`}
        >
          <div className="p-4">
            <button
              onClick={createNewChat}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded flex items-center justify-center mb-4"
            >
              <Bot size={18} className="mr-2" /> New Chat
            </button>
            
            <div className="mt-6">
              <h3 className={`font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Recent Chats</h3>
              <div className="space-y-1">
                {chatHistory.map(chat => (
                  <div
                    key={chat._id}
                    onClick={() => loadChat(chat._id)}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                      currentChatId === chat._id 
                        ? 'bg-rose-500/20 text-rose-500' 
                        : `${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`
                    }`}
                  >
                    <div className="flex items-center truncate">
                      <Bot size={16} className="mr-2 flex-shrink-0" />
                      <span className="truncate">{chat.title || 'New Chat'}</span>
                    </div>
                    <button
                      onClick={(e) => deleteChat(chat._id, e)}
                      className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}`}
                    >
                      <Trash2 size={14} className="text-gray-500 hover:text-red-500" />
                    </button>
                  </div>
                ))}
                
                {chatHistory.length === 0 && (
                  <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'} italic`}>
                    No chat history yet
                  </div>
                )}
              </div>
            </div>
            
            {/* Theme Toggle */}
            <div className="absolute bottom-4 left-4 right-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-full py-2 px-4 rounded flex items-center justify-center ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                    : 'bg-gray-200 hover:bg-gray-300 text-indigo-600'
                }`}
              >
                {darkMode ? (
                  <>
                    <Sun size={18} className="mr-2" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon size={18} className="mr-2" /> Dark Mode
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Chat Header */}
          <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} p-4 flex items-center justify-between border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-3 md:hidden"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="flex items-center">
                <Bot size={24} className="mr-2 text-rose-500" />
                <h2 className="font-bold text-lg">Gemini Chat</h2>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setMessages([])}
                className={`p-2 rounded ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
                title="Clear conversation"
              >
                <RefreshCw size={18} />
              </button>
              <button 
                onClick={downloadConversation}
                className={`p-2 rounded ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
                title="Download conversation"
                disabled={messages.length === 0}
              >
                <DownloadCloud size={18} />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div 
            className={`flex-1 overflow-y-auto p-4 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}
          >
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <Bot size={48} className={`mb-4 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                <h3 className="text-xl font-bold mb-2">How can I help you today?</h3>
                <p className={`max-w-md ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                  Ask me anything! I can help with information, creative content, problem-solving and more.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-3xl rounded-lg px-4 py-3 ${
                        message.role === 'user'
                          ? `${darkMode ? 'bg-rose-500/20 text-white' : 'bg-rose-100 text-gray-800'}`
                          : `${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow`
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                          message.role === 'user' 
                            ? 'bg-rose-500' 
                            : 'bg-blue-500'
                        }`}>
                          {message.role === 'user' ? (
                            <User size={14} className="text-white" />
                          ) : (
                            <Bot size={14} className="text-white" />
                          )}
                        </div>
                        <span className="font-medium">
                          {message.role === 'user' ? 'You' : 'Gemini'}
                        </span>
                        
                        {message.role === 'assistant' && (
                          <button
                            onClick={() => copyToClipboard(message.content)}
                            className={`ml-2 p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                            title="Copy response"
                          >
                            <Copy size={14} className="text-gray-400 hover:text-gray-200" />
                          </button>
                        )}
                      </div>
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          
          {/* Input Area */}
          <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} p-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            {error && (
              <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                placeholder={loading ? 'Gemini is thinking...' : 'Type your message...'}
                className={`flex-1 ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-gray-100 border-gray-300 text-gray-800'
                } border rounded-l px-4 py-2 focus:outline-none focus:border-rose-500`}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className={`bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-r flex items-center justify-center ${
                  (loading || !input.trim()) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Send size={18} />
              </button>
            </form>
            
            <div className="text-xs text-gray-500 mt-2 text-center">
              Powered by Google Gemini AI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiChatPage;