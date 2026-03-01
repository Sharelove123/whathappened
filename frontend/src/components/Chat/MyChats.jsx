import React, { useEffect, useState } from 'react';
import { ChatState } from '../context/ChatContext';
import { chatService } from '../services/api';
import { useAuth } from '../context/AuthContext';

import GroupChatModal from './GroupChatModal';

const MyChats = ({ fetchAgain }) => {
    const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
    const { user } = useAuth();
    const [loggedUser, setLoggedUser] = useState();
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

    const fetchChats = async () => {
        try {
            const data = await chatService.fetchChats();
            setChats(data);
        } catch (error) {
            console.error("Failed to fetch chats", error);
        }
    };

    useEffect(() => {
        setLoggedUser(user);
        fetchChats();
    }, [fetchAgain, user]);

    const getSenderName = (loggedUser, users) => {
        return users[0]?._id === loggedUser?._id ? users[1]?.name : users[0]?.name;
    };

    return (
        <div className={`flex-col md:flex ${selectedChat ? 'hidden' : 'flex'} w-full md:w-1/3 bg-white p-4 border-r overflow-y-auto`}>
            <div className="flex justify-between items-center pb-4 border-b">
                <h2 className="text-2xl font-bold">My Chats</h2>
                <button
                    onClick={() => setIsGroupModalOpen(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
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
                                getSenderName(loggedUser, chat.users)
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

            <GroupChatModal
                isOpen={isGroupModalOpen}
                onClose={() => setIsGroupModalOpen(false)}
                fetchAgain={fetchAgain}
                // Mock setFetchAgain since it's only truly needed locally or passed down if refetching parent
                setFetchAgain={() => { }}
            />
        </div>
    );
};

export default MyChats;
