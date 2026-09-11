import './Trade_Sell.css';
import Trade from './Trade/Trade.jsx';

function Trade_Sell({ value,onChange }) {

  return (
      <div className="trade-sell">
          <Trade value={value} onChange={onChange} />
      </div>
  );
}

export default Trade_Sell;