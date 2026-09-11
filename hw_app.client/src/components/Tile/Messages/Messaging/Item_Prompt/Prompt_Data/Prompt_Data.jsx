import './Prompt_Data.css';

function Prompt_Data({ data }) {
  return (
      <div className="prompt-data">
          <h2 className="prompt-item-name">{data.title || "Item Name"}</h2>
          <p className="prompt-item-description">Description: {data.description}</p>
      </div>
  );
}

export default Prompt_Data;