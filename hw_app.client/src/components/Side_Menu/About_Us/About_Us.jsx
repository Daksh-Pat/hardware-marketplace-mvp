import './About_Us.css';
import TOS from './TOS/TOS.jsx';
import Data_Privacy from './Data_Privacy/Data_Privacy.jsx';
import FAQ from './FAQ/FAQ.jsx';
import Blog from './Blog/Blog.jsx';

// TODO(still have to make these pages and direct to them when clicked)
function About_Us() {
  return (
    <div className="about-us">
          <h3>About Us</h3>  
          <TOS />
          <Data_Privacy />
          <FAQ />
          <Blog />
    </div>
  );
}

export default About_Us;