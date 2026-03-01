import React, { useEffect, useState } from 'react';
import { ChatState } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import { messageService } from '../services/api';
import io from 'socket.io-client';

const ENDPOINT = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api/v2', '') : 'http://localhost:8000';
var socket, selectedChatCompare;

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat } = ChatState();
    const { user } = useAuth();

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) return;
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));

        return () => {
            socket.disconnect();
        }
    }, [user]);

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            setLoading(true);
            const data = await messageService.fetchMessages(selectedChat._id);
            setMessages(data);
            setLoading(false);

            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            console.error("Failed to fetch messages", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    useEffect(() => {
        if (!socket) return;
        socket.on("message recieved", (newMessageRecieved) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
                // Give notification
                setFetchAgain(!fetchAgain);
            } else {
                setMessages([...messages, newMessageRecieved]);
            }
        });
    });

    const sendMessage = async (e) => {
        if ((e.key === "Enter" || e.type === "click") && newMessage) {
            try {
                setNewMessage("");
                const data = await messageService.sendMessage(newMessage, selectedChat._id);
                socket.emit("new message", data);
                setMessages([...messages, data]);
                setFetchAgain(!fetchAgain);
            } catch (error) {
                console.error("Failed to send the message", error);
            }
        }
    };

    return (
        <div className={`md:flex ${selectedChat ? 'flex' : 'hidden'} flex-col w-full md:w-2/3 bg-white p-4 h-full`}>
            {selectedChat ? (
                <>
                    <h2 className="text-2xl font-bold border-b pb-4 mb-4">
                        {!selectedChat.isGroupChat ?
                            selectedChat.users[1]?.name || 'User'
                            : selectedChat.chatName.toUpperCase()}
                    </h2>

                    <div className="flex-1 overflow-y-auto bg-gray-50 rounded p-4 flex flex-col gap-2">
                        {loading ? (
                            <p className="text-center text-gray-400 mt-[20%]">Loading messages...</p>
                        ) : (
                            messages.map((m, i) => (
                                <div key={m._id} className={`flex ${m.sender._id === user?._id ? "justify-end" : "justify-start"}`}>
                                    <span className={`px-4 py-2 rounded-lg max-w-[75%] ${m.sender._id === user?._id ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                                        {m.content}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="mt-4 flex gap-2">
                        <input
                            type="text"
                            className="flex-1 border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={sendMessage}
                        />
                        <button
                            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                            onClick={sendMessage}
                        >
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
