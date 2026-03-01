import React, { useState } from 'react';
import { chatService, authService } from '../../services/api';
import { ChatState } from '../../context/ChatContext';

const GroupChatModal = ({ isOpen, onClose, fetchAgain, setFetchAgain }) => {
    const [groupChatName, setGroupChatName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const { chats, setChats } = ChatState();

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            setSearchResult([]);
            return;
        }

        try {
            setLoading(true);
            // Replace with actual user search API once available or mock it:
            const data = await authService.searchUsers(query);
            setSearchResult(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            // Toast: User already added
            return;
        }
        setSelectedUsers([...selectedUsers, userToAdd]);
    };

    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    };

    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            // Toast: Please fill all fields
            return;
        }

        try {
            const data = await chatService.createGroupChat(groupChatName, selectedUsers);
            setChats([data, ...chats]);
            setFetchAgain(!fetchAgain);
            onClose();
        } catch (error) {
            console.error("Failed to Create the Chat!", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Create Group Chat</h2>

                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Chat Name"
                        className="border rounded px-4 py-2 w-full"
                        onChange={(e) => setGroupChatName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Add Users eg: John, Jane"
                        className="border rounded px-4 py-2 w-full"
                        onChange={(e) => handleSearch(e.target.value)}
                    />

                    {/* Selected Users */}
                    <div className="flex flex-wrap gap-2">
                        {selectedUsers.map(u => (
                            <span key={u._id} className="bg-purple-500 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer" onClick={() => handleDelete(u)}>
                                {u.name} x
                            </span>
                        ))}
                    </div>

                    {/* Search Results */}
                    {loading ? <p>Loading...</p> : (
                        searchResult?.slice(0, 4).map(u => (
                            <div key={u._id} className="bg-gray-100 p-2 rounded cursor-pointer hover:bg-gray-200" onClick={() => handleGroup(u)}>
                                {u.name} ({u.email})
                            </div>
                        ))
                    )}
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create Chat</button>
                </div>
            </div>
        </div>
    );
};

export default GroupChatModal;
