import './Listings.css';
import Item from './Item/Item.jsx';
import Search from './Search/Search.jsx';
import { useState, useEffect } from 'react';
import { getListings } from '@/services/Listings/getListings.js';

function Listings() {
    const [listings, setListings] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [sortSelect, setSortSelect] = useState("");
    const [numSelect, setNumSelect] = useState("20");
    const [tradeInput, setTradeInput] = useState("");

    // Makes API Call to backend with current search parameters to fetch listings and save them in array
    const fetchFilteredHardware = async (currentFilters) => {
        const data = await getListings(currentFilters);
        setListings(data);
    };

    // Runs only once when component loads to get initial batch of listings
    useEffect(() => {
        fetchFilteredHardware({ searchInput: "", sortSelect: "", numSelect: "20", tradeInput: ""});
    }, []);

    // Helper function that whenever one parameter changes it overrides current filters and refetches listings
    const getFreshFilters = (overrides) => ({
        searchInput, sortSelect, numSelect, tradeInput, ...overrides
    });

    return (
        <div className="listing">

            <Search value={searchInput} setValue={(val) => {
                setSearchInput(val);
                fetchFilteredHardware(getFreshFilters({ searchInput: val }));
            }} />

            <div className="filters">

                <select className="sort-select" value={sortSelect} onChange={(e) => {
                    setSortSelect(e.target.value);
                    fetchFilteredHardware(getFreshFilters({ sortSelect: e.target.value }));
                }}>
                    <option value="">Sort by</option>
                    <option value="old_to_new">Date: Old to New</option>
                    <option value="new_to_old">Date: New to Old</option>
                </select>

                <select className="num-select" value={numSelect} onChange={(e) => {
                    setNumSelect(e.target.value);
                    fetchFilteredHardware(getFreshFilters({ numSelect: e.target.value }));
                }}>
                    <option value="20">Items per Page</option>
                    <option value="20">20 (Default)</option>
                    <option value="40">40</option>
                </select>

                <div className="trading-item-for">
                    <p>Trades for: </p>
                    <input
                        type="text"
                        id="trade-for"
                        className="trade-for"
                        placeholder="Trade Item Name"
                        value={tradeInput}
                        onChange={(e) => {
                            setTradeInput(e.target.value);
                            fetchFilteredHardware(getFreshFilters({ tradeInput: e.target.value }));
                        }}
                    />
                </div>

            </div>

            <div className="listings">
                {Array.isArray(listings) && listings.map((listing) => (
                    <div key={listing.id} className="listings-map">
                        <Item data={listing} />
                    </div>
                ))}
            </div>

        </div>
  );
}

export default Listings;