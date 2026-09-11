import './Chat_History.css';
import Chat_Message from './Chat_Message/Chat_Message.jsx';

function Chat_History({ messages }) {
  return (
      <div className="chat-history">
          {Array.isArray(messages) && messages.map((message) => (
              <div key={message.id} className="chat-history-message">
                  <Chat_Message data={message} />
              </div>
          ))}
      </div>
  );
}

export default Chat_History;