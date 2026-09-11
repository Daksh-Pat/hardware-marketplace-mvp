import './Listing_Description.css';
import Title from './Title/Title.jsx';
import Description from './Description/Description.jsx';
import Trade_Sell from './Trade_Sell/Trade_Sell.jsx';
import Image_Upload from './Image_Upload/Image_Upload.jsx';

function Listing_Description({
    title, setTitle,
    description, setDescription,
    tradeSell, setTradeSell,
    handleSubmit,
    handleImage
}) {

  return (
      <div className="listing-description">
          <Title value={title} onChange={setTitle} />
          <Description value={description} onChange={setDescription} />
          <Trade_Sell value={tradeSell} onChange={setTradeSell}  />
          <Image_Upload handleImage={handleImage} />
          <div className="submit">
              <button type="button" className="submit-btn" onClick={handleSubmit}>
                  Submit
              </button>
          </div>
      </div>
  );
}

export default Listing_Description;