import './Sign_Up.css';

function Sign_Up({changeView}) {
    return (
        <div className="sign-up">
            <button className="sign-up-btn" onClick={() => changeView('sign_up')}>
                Sign Up
            </button>
        </div>
    );
}

export default Sign_Up;