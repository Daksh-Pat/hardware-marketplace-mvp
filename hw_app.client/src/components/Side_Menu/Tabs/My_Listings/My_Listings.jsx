import './My_Listings.css';

function My_Listings({ changeView }) {
  return (
    <div className="my-listings">
          <button className="my-listings-btn" onClick={() => changeView('my_list')}>
            My Listings
          </button>
     </div>
  );
}

export default My_Listings;