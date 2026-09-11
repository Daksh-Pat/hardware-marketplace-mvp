import './Item.css';
import { createChatRoom } from '@/services/Chatrooms/chatroomCreate.js';

function Item({ data }) {

    // Creates new message room with seller and you for their listing
    const handleSubmit = async (e) => {
        e.preventDefault();
        await createChatRoom(data.userId, data.id);
        alert('New trade room created! Check your Messages tab.');
    };

    // TODO (move to env file eventually)
    const API_BASE_URL = "https://localhost:7081";

    return (
      <div className="item">
          <div className="image">
                <img src={`${API_BASE_URL}/${data.imageUrl}`} alt={data.title}/>
          </div>

          <div className="metadata">
            <h3>{data.title}</h3>
            <p>Sold by: <strong>{data.userUsername}</strong></p>
            <p>Trading for: <strong>{data.tradeTitle}</strong></p>
          </div>

          <div className="list-btn-container">
                <button className="list-btn" onClick={(e) => handleSubmit(e)}>
                Message
            </button>
          </div>

      </div>
    );
}

export default Item;