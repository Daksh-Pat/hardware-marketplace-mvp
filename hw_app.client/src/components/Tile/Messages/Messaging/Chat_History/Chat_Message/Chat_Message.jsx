import './Chat_Message.css';
import { formatMessageTime } from '@/services/Chatrooms/formatMessageTime.js'

function Chat_Message({ data }) {
  return (
      <div className="chat-message">
          <p className="other-user"><strong>{data.senderName}</strong> - {formatMessageTime(data.sentAt)}</p>
          <h2 className="other-user-message">{data.content}</h2>
      </div>
  );
}

export default Chat_Message;