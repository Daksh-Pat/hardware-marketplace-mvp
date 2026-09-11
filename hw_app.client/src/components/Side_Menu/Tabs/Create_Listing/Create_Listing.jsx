import './Create_Listing.css';

function Create_Listing({ changeView }) {
  return (
     <div className="create-listing">
          <button className="create-listing-btn" onClick={() => changeView('create_listing')}>
            Create Listing
          </button>
     </div>
  );
}

export default Create_Listing;