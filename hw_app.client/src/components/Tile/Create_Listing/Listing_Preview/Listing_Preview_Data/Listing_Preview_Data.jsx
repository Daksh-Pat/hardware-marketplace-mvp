import './Listing_Preview_Data.css';

function Listing_Preview_Data({title,tradeSell,description}) {
  return (
      <div className="listing-preview-data">
          <h2 className="preview-title">{title || 'Item Title'}</h2>
          <h2 className="preview-transaction">Trading for: {tradeSell}</h2>
          <h2>Description:</h2>
          <h2 className="preview-description">{description}</h2>
      </div>
  );
}

export default Listing_Preview_Data;