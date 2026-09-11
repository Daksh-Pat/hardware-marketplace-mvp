import './Saved_Search.css';

function Saved_Search({value,setValue}) {
  return (
      <div className="saved-search">
          <div className="saved-search-bar-container">
              <input
                  type="search"
                  id="search-input"
                  name="q"
                  placeholder="Search"
                  className="saved-search-bar"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
              />
              <button className="saved-search-btn">
                  Search
              </button>
          </div>
      </div>
  );
}

export default Saved_Search;