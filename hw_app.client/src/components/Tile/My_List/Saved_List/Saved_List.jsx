import './Saved_List.css';
import Saved_Search from './Saved_Search/Saved_Search.jsx';
import Saved_Listings from './Saved_Listings/Saved_Listings.jsx';
import { useState, useEffect } from 'react';
import { getListings } from '@/services/Listings/getListings.js';
import { deleteListing } from '@/services/Listings/deleteListing.js';

function Saved_List() {
    const [listings, setListings] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    // Makes API call to backend for listings based on search results AND only belong to logged in user
    const fetchFilteredHardware = async (currentFilters) => {
        const data = await getListings(currentFilters);
        setListings(data);
    };

    // Runs only once when component loads to get initial batch of listings
    useEffect(() => {
        fetchFilteredHardware({ searchInput: "", mine:"true" });
    }, []);

    // Helper function that whenever one parameter changes it overrides current filters and refetches listings
    const getFreshFilters = (overrides) => ({
        searchInput, ...overrides
    });

    // Selected listing gets id sent to backend so it can be deleted from database
    const handleDelete = (id) => {

        // If no listing selected nothing gets sent
        if (!id) {
            console.error("Delete failed: Invalid listing ID.");
            return;
        }
        
        try {
            deleteListing(id); // Delete listing with id in database
            setListings((prevListings) => prevListings.filter((item) => item.id !== id)); // Refresh listings on page
        } catch (err) {
            console.error("Failed to delete listing:", err);
        }
    };

  return (
      <div className="saved-list">
          <Saved_Search value={searchInput} setValue={(val) => {
              setSearchInput(val);
              fetchFilteredHardware({ searchInput: val });
          }} />
          <div className="listings">
              {Array.isArray(listings) && listings.map((listing) => (
                  <div key={listing.id} className="listings-map">
                      <Saved_Listings data={listing} delete={handleDelete} />
                  </div>
              ))}
          </div>
      </div>
  );
}

export default Saved_List;