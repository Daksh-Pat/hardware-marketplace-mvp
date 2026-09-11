import './Logout.css';

function Logout() {

    // Logs out user and removes JWT Token from storage when clicked
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

  return (
      <div className="logout-btn-ctn">
          <h3>My Account</h3>
          <button className="logout-btn" onClick={handleLogout}>
              Log Out
          </button>
      </div>
  );
}

export default Logout;