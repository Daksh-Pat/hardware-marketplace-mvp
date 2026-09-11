import './Search.css';

function Search({ value,setValue,onClick }) {
  return (
      <div className="search">
              <input
                  type="search"
                  id="search-input"
                  name="q"
                  placeholder="Search"
                  className="search-bar"
                  value={value}
                  onChange={(e)=>setValue(e.target.value)}
              />
              <div className="search-btn-container">
                  <button className="search-btn" onClick={onClick}>
                      Search
                  </button>
              </div>
      </div>
  );
}

export default Search;