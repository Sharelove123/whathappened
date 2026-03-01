import React from 'react';
import { ChatState } from '../context/ChatContext';

const MyChats = ({ fetchAgain }) => {
    const { selectedChat, setSelectedChat, chairs, chats } = ChatState();

    return (
        <div className={`flex-col md:flex ${selectedChat ? 'hidden' : 'flex'} w-full md:w-1/3 bg-white p-4 border-r overflow-y-auto`}>
            <div className="flex justify-between items-center pb-4 border-b">
                <h2 className="text-2xl font-bold">My Chats</h2>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    New Group Chat
                </button>
            </div>
            <div className="mt-4 flex flex-col gap-2">
                {chats ? chats.map((chat) => (
                    <div
                        onClick={() => setSelectedChat(chat)}
                        className={`cursor-pointer px-4 py-3 rounded ${selectedChat === chat ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                        key={chat._id}
                    >
                        <p className="font-semibold">
                            {!chat.isGroupChat ?
                                // Placeholder for getSender name since we don't have logged user context here easily yet
                                chat.users[1]?.name || 'User'
                                : chat.chatName}
                        </p>
                        {chat.latestMessage && (
                            <p className="text-sm truncate">
                                <b>{chat.latestMessage.sender.name} : </b>
                                {chat.latestMessage.content.length > 50
                                    ? chat.latestMessage.content.substring(0, 51) + "..."
                                    : chat.latestMessage.content}
                            </p>
                        )}
                    </div>
                )) : (
                    <p>Loading chats...</p>
                )}
            </div>
        </div>
    );
};

export default MyChats;
