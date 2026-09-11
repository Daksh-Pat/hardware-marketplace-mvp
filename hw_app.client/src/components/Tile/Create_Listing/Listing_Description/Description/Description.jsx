import './Description.css';

function Description({value,onChange}) {
  return (
      <div className="description-container" value={value} onChange={(e) => onChange(e.target.value)}>
          <h2>Item Description: </h2>
          <textarea className="description" placeholder="Enter Text Here" maxLength="100" rows="10" columns="20"></textarea>
      </div>
  );
}

export default Description;