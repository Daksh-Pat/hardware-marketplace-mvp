import Logo from './Logo/Logo.jsx';
import Tabs from './Tabs/Tabs.jsx';
import About_Us from './About_Us/About_Us.jsx';
import Account_Buttons from './Account_Buttons/Account_Buttons.jsx';
import Logout from './Logout/Logout.jsx';
import './Side_Menu.css';

function Side_Menu({ changeView }) {

    // Depending on logged in state, shows marketplace or site info buttons
    const renderTabs = () => {
        const token = localStorage.getItem('token');
        if (token) {
            return <Tabs changeView={changeView} />;
        }
        return <About_Us />;
    };

    // Depending on logged in state, shows login or logout button
    const renderButtons = () => {
        const token = localStorage.getItem('token');
        if (token) {
            return <Logout />;
        }
        return <Account_Buttons changeView={changeView} />;
    };

  return (
      <div className="side-menu">
          <Logo />
          {renderTabs()}
          {renderButtons()}
      </div>
  );
}

export default Side_Menu;