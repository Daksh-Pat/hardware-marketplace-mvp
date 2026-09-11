import './Listing_Preview.css';
import Listing_Preview_Image from './Listing_Preview_Image/Listing_Preview_Image.jsx';
import Listing_Preview_Data from './Listing_Preview_Data/Listing_Preview_Data.jsx';

function Listing_Preview({title,tradeSell,description,imagePreview}) {
  return (
      <div className="listing-preview">
          <Listing_Preview_Image imagePreview={imagePreview} />
          <Listing_Preview_Data
              title={title}
              tradeSell={tradeSell}
              description={description}
          />
      </div>
  );
}

export default Listing_Preview;