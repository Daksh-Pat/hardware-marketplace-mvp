import './Image_Upload.css';

function Image_Upload({handleImage}) {
  return (
      <div className="image-upload-container">
          <h2>Select Images:</h2>
          <input
              type="file"
              accept="image/*"
              className="image-upload"
              onChange={handleImage}
          />
      </div>
  );
}

export default Image_Upload;