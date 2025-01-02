import React from 'react';
import { Send } from 'lucide-react';

function ChatBox({ messages, message, setMessage, handleSubmit }) {
    return (
        <div className="flex flex-col w-full max-w-4xl bg-stone-900 border border-yellow-500 shadow-2xl rounded-lg overflow-hidden h-[70vh]">
            <div className="flex flex-col flex-grow p-4 overflow-auto scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-gray-800">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex w-full mt-3 space-x-3 max-w-xs ${msg.isUser ? 'ml-auto justify-end' : ''}`}>
                        <div className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'}`}>
                            <div className={`p-3 rounded-lg ${msg.isUser ? 'bg-yellow-700' : 'bg-blue-800'}`}>
                                <p className="text-xs font-semibold mb-1 text-gray-300">{msg.username}</p>
                                <p className="text-sm text-white">{msg.text}</p>
                            </div>
                            <span className="text-xs text-gray-500 mt-1">
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="bg-stone-800 p-4">
                <form onSubmit={handleSubmit} className="flex items-center">
                    <input 
                        className="flex-grow h-10 rounded-l-full px-4 text-sm bg-stone-900 border-t border-b border-l border-yellow-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800"
                        type="text" 
                        placeholder="Type your message…"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button 
                        type="submit" 
                        className="h-10 px-4 rounded-r-full bg-yellow-500 text-gray-900 font-semibold transition-colors duration-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ChatBox;