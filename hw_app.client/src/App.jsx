import './App.css';
import Side_Menu from './components/Side_Menu/Side_Menu.jsx';
import Tile from './components/Tile/Tile.jsx';
import Account from './components/Account/Account.jsx';
import { useState } from 'react';

function App() {
    const [activeView, setActiveView] = useState('browse_listings'); // Stores the view state of the right component for switching tabs
    const [token, setToken] = useState(localStorage.getItem('token')); // Stores the JWT token passed from backend during login/signup

    // Handler function that checks if token exists in local storage or not and returns component for right side of screen
    const renderRightComponent = () => {
        // If token exists return the marketplace tileset that changes based on tab buttons
        if (token) {
            return <Tile activeView={activeView} />;
        }

        // Otherwise return the login screen
        return <Account token={token} setToken={setToken} />;
    };

    return (
        <div className="overview">
            <Side_Menu changeView={setActiveView} />
            {renderRightComponent()}
        </div>
    );
}

export default App;