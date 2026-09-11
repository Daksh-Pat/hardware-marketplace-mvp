import './Title.css';

function Title({value,onChange}) {
  return (
      <div className="title-container" value={value} onChange={(e) => onChange(e.target.value)}>
          <h2>Item Title: </h2>
          <textarea className="title" placeholder="Enter Title Here" maxLength="100" rows="1" columns="1"></textarea>
      </div>
  );
}

export default Title;