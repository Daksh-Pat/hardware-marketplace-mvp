import './Trade_Option.css';

function Trade_Option({onDelete}) {
  return (
      <div className="trade-option">
          <div className="trade-or-sell">
              <h2>Cancel Trade?</h2>
          </div>
          <div className="cancel" onClick={onDelete}>
              <button className="cancel-btn">
                  Cancel
              </button>
          </div>
      </div>
  );
}

export default Trade_Option;