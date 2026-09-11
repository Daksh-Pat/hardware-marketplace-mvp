import './Sign_Buttons.css'
import Sign_In from './Sign_In/Sign_In.jsx';
import Sign_Up from './Sign_Up/Sign_Up.jsx';

function Sign_Buttons({changeView}) {
  return (
      <div className="sign-buttons">
          <Sign_In changeView={changeView} />
          <Sign_Up changeView={changeView} />
      </div>
  );
}

export default Sign_Buttons;