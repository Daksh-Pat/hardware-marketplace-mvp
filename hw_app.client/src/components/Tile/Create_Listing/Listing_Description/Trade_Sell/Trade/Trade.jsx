import './Trade.css';

function Trade({ value, onChange }) {
  return (
      <div className="trade">
          <h2>Trade Item Title: </h2>
          <textarea className="trade-title" placeholder="Enter Title Here" maxLength="100" rows="1" columns="1" value={value} onChange={(e) => onChange(e.target.value)}></textarea>
      </div>
  );
}

export default Trade;