import './Prompt_Image.css';

function Prompt_Image({ data }) {
    const API_BASE_URL = "https://localhost:7081";
  return (
      <div className="prompt-image">
          <img src={`${API_BASE_URL}/${data.imageUrl}`} alt={data.title}></img>
      </div>
  );
}

export default Prompt_Image;