import './Account_Buttons.css';
import Sign_Buttons from './Sign_Buttons/Sign_Buttons.jsx';

function Account_Buttons({ changeView }) {
  return (
      <div className="account-buttons">
          <h3>My Account</h3> 
          <Sign_Buttons changeView={changeView} />
      </div>
  );
}

export default Account_Buttons;