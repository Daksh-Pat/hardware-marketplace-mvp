import './Logo.css';
import logo from '@/assets/H(1).png';

function Logo() {

    // Reloads the page when logo is clicked
    const handleRefresh = () => {
        window.location.reload();
    }

  return (
      <div className="logo" onClick={handleRefresh}>
          <img
              className="logo-button"
              src={logo}
          />
      </div>
  );
}

export default Logo;