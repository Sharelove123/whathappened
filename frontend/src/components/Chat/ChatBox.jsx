import React from 'react';
import { ChatState } from '../context/ChatContext';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat } = ChatState();

    return (
        <div className={`md:flex ${selectedChat ? 'flex' : 'hidden'} flex-col w-full md:w-2/3 bg-white p-4 h-full`}>
            {selectedChat ? (
                <>
                    <h2 className="text-2xl font-bold border-b pb-4 mb-4">
                        {!selectedChat.isGroupChat ?
                            selectedChat.users[1]?.name || 'User'
                            : selectedChat.chatName.toUpperCase()}
                    </h2>
                    <div className="flex-1 overflow-y-auto bg-gray-50 rounded p-4">
                        {/* Messages will be displayed here */}
                        <p className="text-center text-gray-400 mt-[20%]">Messages will appear here</p>
                    </div>
                    <div className="mt-4 flex gap-2">
                        <input
                            type="text"
                            className="flex-1 border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type a message..."
                        />
                        <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                            Send
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-full">
                    <h1 className="text-3xl text-gray-400">Click on a user to start chatting</h1>
                </div>
            )}
        </div>
    );
};

export default ChatBox;
