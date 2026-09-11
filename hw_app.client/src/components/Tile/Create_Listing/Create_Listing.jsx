import './Create_Listing.css';
import Listing_Description from './Listing_Description/Listing_Description.jsx';
import Listing_Preview from './Listing_Preview/Listing_Preview.jsx';
import { useState, useEffect } from 'react';
import { createListing } from '@/services/Listings/createListing.js';

function Create_Listing() {
  const [title,setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tradeSell, setTradeSell] = useState(""); // Title of the item user wants to trade for
  const [imageFile, setImageFile] = useState(null); // Stores actual image file
  const [previewUrl, setPreviewUrl] = useState(null); // Stores the object URL of the image file to display in HTML

  // Sends form data to backend to create listing in database and refreshs page
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createListing(title, description, imageFile, tradeSell);
    window.location.reload();
  };

  // Saves uploaded image in state variable and converts to object URL and saves URL to display in HTML
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl); // Revokes old object URL if present
      }

      const objectUrl = URL.createObjectURL(file); // Converts file to object URL to display in HTML
      setPreviewUrl(objectUrl);
    }
  };

  // Clears up memory when preview image changes by revoking URL
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
      <div className="create-listing">
          <Listing_Description
              title={title} setTitle={setTitle}
              description={description} setDescription={setDescription}
              tradeSell={tradeSell} setTradeSell={setTradeSell}
              handleSubmit={handleSubmit}
              handleImage={handleImage}
          />
          <Listing_Preview
              title={title}
              tradeSell={tradeSell}
              description={description}
              imagePreview={previewUrl}
          />
      </div>
  );
}

export default Create_Listing;