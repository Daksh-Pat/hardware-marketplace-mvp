import './Textbox.css';

function Textbox({ inputText, onChange, onSubmit }) {
  return (
    <div className="textbox">
          <input
              type="search"
              id="search-input"
              placeholder="Enter Text"
              className="text-bar"
              value={inputText}
              onChange={(e) => onChange(e.target.value)}
          />
          <button className="send" onClick={onSubmit}>
            Send
          </button>
      </div>
  );
}

export default Textbox;