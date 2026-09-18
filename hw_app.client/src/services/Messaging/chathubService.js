import { HubConnectionBuilder } from '@microsoft/signalr';

const API_BASE_URL = import.meta.env.VITE_CHAT_URL;

export const startChatHubConnection = (chatRoomId, onMessageReceived) => {

    // Builds connection to chathub with JWT token and automatic reconnect enabled
    const hubConnection = new HubConnectionBuilder()
        .withUrl(`${API_BASE_URL}/hubs/chat`, {
            accessTokenFactory: () => localStorage.getItem('token') || '',
            withCredentials: true
        })
        .withAutomaticReconnect()
        .build();

    // If receive message from chathub sends to frontend and displays it in message array
    hubConnection.on('ReceiveMessage', (message) => {
        console.log("RECEIVED BROADCAST FROM SERVER:", message);
        onMessageReceived(message);
    });

    // Join chatroom specific to the chatRoomId, if not or unauthorized logs out user
    hubConnection
        .start()
        .then(() => {
            return hubConnection.invoke('JoinTradeRoom', chatRoomId);
        })
        .catch((err) => {
            console.error("SignalR Connection Failed:", err);
            if (err.message && (err.message.includes("401") || err.message.includes("Unauthorized"))) {
                alert("Session expired. Please log in again.");
                localStorage.removeItem("token");
                window.location.reload();
            }
        });

    return hubConnection;
};

export const stopChatHubConnection = async (hubConnection, chatRoomId) => {

    // If not current websocket connection it closes function
    if (!hubConnection) return;

    // Tries to stop websocket connection passed and leave trade room unless error throws up
    try {
        if (hubConnection.state === 'Connected') {
            await hubConnection.invoke('LeaveTradeRoom', chatRoomId);
        }
        await hubConnection.stop();
    } catch (err) {
        console.error("Error tearing down SignalR connection:", err);
    }
};