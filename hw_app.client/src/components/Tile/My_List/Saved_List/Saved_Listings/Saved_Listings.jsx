import './Saved_Listings.css';

function Saved_Listings({ data, delete: handleDeleteProp }) {

    // TODO(have to move to env file later)
    const API_BASE_URL = "https://localhost:7081";
  return (
      <div className="saved-listing">
                  <div className="image">
                      <img src={`${API_BASE_URL}/${data.imageUrl}`} alt={data.title} />
                  </div>
                  <div className="metadata">
                      <h3>{data.title}</h3>
                      <p>Sold by: <strong>{data.userUsername}</strong></p>
                      <p>Trading for: <strong>{data.tradeTitle}</strong></p>
                  </div>

                  <div className="delete-btn-container" onClick={() => handleDeleteProp(data.id)}>
                      <button className="delete-btn">
                          Delete
                      </button>
                  </div>
      </div>
  );
}

export default Saved_Listings;