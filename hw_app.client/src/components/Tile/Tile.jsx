import './Tile.css';
import Listings from './Listings/Listings.jsx';
import Messages from './Messages/Messages.jsx';
import Create_Listing from './Create_Listing/Create_Listing.jsx';
import My_List from './My_List/My_List.jsx';

function Tile({ activeView }) {

    // Set which page to render based on activeView value
    const renderRightComponent = () => {
        switch (activeView) {
            case 'browse_listings':
                return <Listings />
            case 'my_messages':
                return <Messages />
            case 'create_listing':
                return <Create_Listing />
            case 'my_list':
                return <My_List />
            default:
                return <Listings />
        }
    };

    return (
      <div className="tile">
        {renderRightComponent()}
      </div>
  );
}

export default Tile;