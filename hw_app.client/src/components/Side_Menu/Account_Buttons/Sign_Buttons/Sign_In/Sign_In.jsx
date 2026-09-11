import './Sign_In.css';

function Sign_In({changeView}) {
  return (
    <div className="sign-in">
          <button className="sign-in-btn" onClick={() => changeView('sign_in')}>
            Sign In
          </button>
    </div>
  );
}

export default Sign_In;