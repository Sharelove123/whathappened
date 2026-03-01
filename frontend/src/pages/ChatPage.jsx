import React, { useState } from 'react';
import MyChats from '../components/Chat/MyChats';
import ChatBox from '../components/Chat/ChatBox';

const ChatPage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <div className="w-full flex h-[85vh] border rounded-lg shadow-lg overflow-hidden bg-white">
            <MyChats fetchAgain={fetchAgain} />
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </div>
    );
};

export default ChatPage;
