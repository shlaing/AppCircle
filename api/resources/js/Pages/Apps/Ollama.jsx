import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Ollama({ auth, response }) {

    const { data, setData, post, processing, errors } = useForm({
        prompt: '',
    });

    const [messages, setMessages] = useState([
        { 
            text: 'Hello! I\'m Ollama, powered by Llama3. How can I help you today?', 
            sender: 'ai',
            timestamp: new Date() 
        }
    ]);
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messageContainerRef = useRef(null);
    
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };
    

    const handleSend = async () => {
        if (prompt.trim() && !isLoading) {
            setIsLoading(true);
            
            // Add user message to the chat with timestamp
            const userMessage = { 
                text: prompt, 
                sender: 'user',
                timestamp: new Date() 
            };
            setMessages(prevMessages => [...prevMessages, userMessage]);
            setPrompt('');
            
            // Simulate AI response after a short delay
            setTimeout(async () => {
                // Simulate typing indicator
                setMessages(prevMessages => [...prevMessages, { 
                    text: 'Thinking...', 
                    sender: 'ai', 
                    isTyping: true,
                    timestamp: new Date() 
                }]);

                noStreamAsk()

                setPrompt('');
                setIsLoading(false);
            }, 500);
        }
    };

    const noStreamAsk = async () => {
        const res = await axios.post(route('ollama.ask'), { prompt });
                
        setMessages(prev => [
            ...prev.slice(0, -1), // remove "Thinking..."
            {
                sender: 'ai',
                text: res.data.response,
                isTyping: false,
                timestamp: new Date() 
            }
        ]);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Ollama + Llama3" />

            <div className="py-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-row flex-wrap">
                        <div className="w-full bg-white p-4 m-0 shadow-sm sm:rounded">
                            
                            <div className="flex flex-col h-[calc(100vh-120px)]">
                                
                                <div ref={messageContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-start space-x-2 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}
                                    >
                                        {/* Avatar */}
                                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                                            message.sender === 'user' 
                                                ? 'bg-blue-600' 
                                                : message.isError 
                                                ? 'bg-red-600' 
                                                : 'bg-gray-700'
                                        }`}>
                                            {message.sender === 'user' ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            ) : message.isError ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm10-3.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-3.5 7a.5.5 0 00.5.5h2a.5.5 0 000-1h-2a.5.5 0 00-.5.5z" />
                                                </svg>
                                            )}
                                        </div>
                                        
                                        {/* Message bubble */}
                                        <div className="flex flex-col">
                                            <div
                                                className={`prose max-w-none w-full min-w-[60px] p-3 rounded-lg ${
                                                    message.sender === 'user' 
                                                        ? 'bg-blue-500 text-white' 
                                                        : message.isError 
                                                        ? 'bg-red-100 text-red-800 border border-red-300 mr-[-100px]' 
                                                        : 'bg-gray-200 text-gray-800 mr-[-100px]'
                                                } shadow`}
                                            >
                                                {message.isTyping ? (
                                                    <div className="flex space-x-2 items-center">
                                                        <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                        <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                        <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                                    </div>
                                                ) : (
                                                    <ReactMarkdown>{message.text}</ReactMarkdown>
                                                )}
                                            </div>
                                            {message.timestamp && !message.isTyping && (
                                                <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-right text-gray-500' : 'text-left text-gray-500'}`}>
                                                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                
                                <div className="bg-white p-4 border-t border-gray-200">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <h3 className="text-sm font-medium text-gray-700 mr-2">Chat with Ollama</h3>
                                            <div className="flex items-center">
                                                <div className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse"></div>
                                                <span className="text-xs text-green-600">Online</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {messages.length > 1 && (
                                                <button 
                                                    onClick={() => setMessages([
                                                        { 
                                                            text: 'Hello! I\'m Ollama, powered by Llama3. How can I help you today?', 
                                                            sender: 'ai',
                                                            timestamp: new Date() 
                                                        }
                                                    ])} 
                                                    className="text-xs text-gray-500 hover:text-red-500 transition flex items-center"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Clear chat
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <div className="flex-1 relative">
                                            <input
                                                type="text"
                                                value={prompt}
                                                onChange={(e) => setPrompt(e.target.value)}
                                                onKeyDown={handleKeyPress}
                                                placeholder="Ask ..."
                                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16"
                                                maxLength={500}
                                            />
                                            <div className={`absolute right-2 bottom-2 text-xs ${prompt.length > 450 ? 'text-orange-500' : 'text-gray-400'}`}>
                                                {prompt.length}/500
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleSend}
                                            disabled={!prompt.trim() || isLoading}
                                            className={`px-4 py-2 rounded-lg transition flex items-center justify-center min-w-[80px] ${!prompt.trim() || isLoading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing
                                                </>
                                            ) : 'Send'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                
            </div>
        </AuthenticatedLayout>
    );
}