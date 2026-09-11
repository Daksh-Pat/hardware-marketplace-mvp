import Browse_Listings from './Browse_Listings/Browse_Listings.jsx';
import Create_Listing from './Create_Listing/Create_Listing.jsx';
import My_Messages from './My_Messages/My_Messages.jsx';
import My_Listings from './My_Listings/My_Listings.jsx';
import './Tabs.css';

function Tabs({ changeView }) {
  return (
      <div className="tabs">
          <h3>Marketplace</h3>  
          <Browse_Listings changeView={changeView}/>
          <Create_Listing changeView={changeView} />
          <My_Listings changeView={changeView} />
          <My_Messages changeView={changeView} />
      </div>
  );
}

export default Tabs;