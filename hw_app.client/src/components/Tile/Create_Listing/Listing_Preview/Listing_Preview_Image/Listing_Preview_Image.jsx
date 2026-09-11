import './Listing_Preview_Image.css';

function Listing_Preview_Image({ imagePreview }) {
  return (
      <div className="listing-preview-image">
          <img
              src={imagePreview}
              alt="Selected file preview"
              className="image-file"
          />
      </div>
  );
}

export default Listing_Preview_Image;