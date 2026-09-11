import './Messages.css';
import Users from './Users/Users.jsx';
import Messaging from './Messaging/Messaging.jsx';
import { useEffect, useState } from 'react';
import { chatroomDelete } from '@/services/Chatrooms/chatroomDelete.js';
import { getMessages } from '@/services/Messaging/getMessages.js';
import { startChatHubConnection, stopChatHubConnection } from '@/services/Messaging/chathubService.js';

function Messages() {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [chatRoomId, setChatRoomId] = useState(null);
    const [itemId, setItemId] = useState(null);

    // Joins chatroom and updates messages shown based on the chatroom selected
    useEffect(() => {
        if (!chatRoomId) return; // If no chatroomId is set then no chatroom is joined

        setMessages([]); // Reset messages after changing rooms

        // Call backend API to get messages for chatroomid, then set messages based on that
        getMessages(chatRoomId)
            .then((data) => setMessages(data || []))
            .catch((err) => console.error('Failed to load message history:', err));

        // Connects to SignalR chat hub and appends incoming real-time messages to state
        const hubConn = startChatHubConnection(chatRoomId, (newMessage) => {
            setMessages((prev) => [newMessage, ...prev]);
        });
        setConnection(hubConn);

        // If switch rooms or tabs disconnects SignalR chat hub
        return () => {
            stopChatHubConnection(hubConn, chatRoomId);
        };
    }, [chatRoomId]);

    // Sends message to chatroom through websocket and clears message input from memory
    const handleSendMessage = async (e) => {
        e.preventDefault();
        connection.invoke('SendMessage', chatRoomId, inputText);
        setInputText('');
    };

    // Sets current chatroom and listing that chatroom is based on
    const handleSelectRoom = (listingId, id) => {
        setChatRoomId(id);
        setItemId(listingId);
    };

    // Deletes chatroom when called
    const handleDeleteRoom = () => {
        chatroomDelete(chatRoomId);
    };

    return (
        <div className="messages">
            <Users onChange={handleSelectRoom}/>
            <Messaging
                messages={messages}
                inputText={inputText}
                onChange={setInputText}
                onSubmit={handleSendMessage}
                onDelete={handleDeleteRoom}
                listingId={itemId}
            />
        </div>
  );
}

export default Messages;