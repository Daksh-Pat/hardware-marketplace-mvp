import './Item_Prompt.css';
import Prompt_Image from './Prompt_Image/Prompt_Image.jsx';
import Prompt_Data from './Prompt_Data/Prompt_Data.jsx';
import Trade_Option from './Trade_Option/Trade_Option.jsx';
import { getSingleListing } from '@/services/Listings/getSingleListing.js';
import { useEffect, useState } from 'react';

function Item_Prompt({ onDelete, listingId }) {
    const [listing, setListing] = useState(""); // For storing listing data pulled based on listingId

    // API call to backend to get listing data based on listingId and sets it to state variable
    useEffect(() => {
        const fetchListing = async () => {
            try {
                const data = await getSingleListing(listingId);
                setListing(data);
            } catch (err) {
                console.error("Error fetching listing:", err);
            }
        };

        if (listingId) {
            fetchListing();
        }
    }, [listingId]);
  
  return (
      <div className="item-prompt">
          <Prompt_Image data={listing} />
          <Prompt_Data data={listing} />
          <Trade_Option onDelete={onDelete} />
      </div>
  );
}

export default Item_Prompt;