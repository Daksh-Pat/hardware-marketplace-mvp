import './Users.css';
import { useState, useEffect } from 'react';
import { getChatrooms } from '@/services/Chatrooms/getChatrooms.js';

function Users({onChange}) {
    const [rooms, setRooms] = useState([]);

    // API call to backend to get chatrooms for current logged in user and sets them to react state array
    const fetchRooms = async () => {
        try {
            const data = await getChatrooms();
            setRooms(data);
        } catch (error) {
            console.error("Failed to fetch chatrooms:", error);
        }
    };

    // Fetches the initial list of chatrooms when the component first mounts
    useEffect(() => {
        fetchRooms();
    }, []);

    // Changes current chatroom to whichever one is clicked
    const handleClick = (e, room) => {
        e.preventDefault();
        onChange(room.listingId, room.id);
    };

  return (
      <div className="users">
          <h2 className="messages-title">Messages</h2>
          {Array.isArray(rooms) && rooms.map((room) => (
              <div key={room.id} className="user-message" onClick={(e) => handleClick(e, room)}>
                  <p className="username">Seller: {room.sellerName}</p>
                  <p className="item-name">Listing: {room.listingName}</p>
               </div>
          ))}
      </div>
  );
}

export default Users;