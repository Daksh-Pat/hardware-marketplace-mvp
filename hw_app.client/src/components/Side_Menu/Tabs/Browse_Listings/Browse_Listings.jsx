import './Browse_Listings.css';

function Browse_Listings({ changeView }) {
  return (
      <div className="browse-listings">
          <button className="browse-listings-btn" onClick={() => changeView('browse_listings')}>
            Browse Listings
          </button>
      </div>
  );
}

export default Browse_Listings;